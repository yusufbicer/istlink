
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, Eye, FileText, Clock, AlertCircle, LockKeyhole, CheckCircle2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must use only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().max(200, "Excerpt must be less than 200 characters").optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  published: z.boolean().default(false),
  accessToken: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BlogPost extends Omit<FormValues, 'accessToken'> {
  id?: string;
  author_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Secret token for direct blog creation - in a real app, store this securely
const BLOG_ACCESS_TOKEN = "groopsecretblogs2025"; 

const BlogEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasValidToken, setHasValidToken] = useState(false);

  // Check if user is admin or has valid access token
  const isAdmin = user && user.role === 'admin';
  const hasAccess = isAdmin || hasValidToken;

  // Verify token on mount
  useEffect(() => {
    if (accessToken === BLOG_ACCESS_TOKEN) {
      setHasValidToken(true);
      console.log("Valid access token provided");
    } else if (accessToken) {
      console.log("Invalid access token provided");
    }
  }, [accessToken]);

  // Redirect if not authorized
  useEffect(() => {
    if (!isAdmin && !hasValidToken) {
      console.log("Access denied - Current user:", user, "Token valid:", hasValidToken);
      navigate('/admin');
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You must be logged in as an admin or have a valid access token to edit blog posts."
      });
    }
  }, [isAdmin, hasValidToken, navigate, toast, user]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      accessToken: accessToken || '',
    },
  });

  // Format title to slug
  const generateSlugFromTitle = (title: string) => {
    if (!isEditing || !originalSlug) {
      return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    return originalSlug;
  };

  // Handle title changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && value.title && !isEditing) {
        form.setValue('slug', generateSlugFromTitle(value.title as string));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, isEditing]);

  // Fetch post data if editing
  useEffect(() => {
    async function fetchPost() {
      if (!slug || slug === 'new') {
        setIsEditing(false);
        return;
      }

      setIsEditing(true);
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        if (data) {
          setOriginalSlug(data.slug);
          form.reset({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || '',
            content: data.content,
            published: data.published || false,
            accessToken: accessToken || '',
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast({
          title: "Error",
          description: "Failed to load the blog post.",
          variant: "destructive",
        });
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    }

    if (hasAccess) {
      fetchPost();
    }
  }, [slug, form, navigate, toast, hasAccess, accessToken]);

  const onSubmit = async (values: FormValues) => {
    if (!hasAccess) {
      console.error("Not authorized to save post");
      toast({
        title: "Error",
        description: "You must be logged in as an admin or have a valid access token to save blog posts.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Ensure timestamps are in ISO format
      const timestamp = new Date().toISOString();
      
      // Remove accessToken from values before saving to database
      const { accessToken: _, ...postValues } = values;
      
      if (isEditing && slug) {
        console.log("Updating existing post:", postValues);
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...postValues,
            updated_at: timestamp,
          })
          .eq('slug', slug);

        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }

        setSuccess("Blog post updated successfully!");
        toast({
          title: "Success",
          description: "Blog post updated successfully.",
        });
        
        // If the slug changed, navigate to the new URL
        if (values.slug !== slug) {
          navigate(`/blog/${values.slug}`);
        } else {
          navigate(`/blog/${slug}`);
        }
      } else {
        // Create new post - Make sure all required fields are present
        const newPost = {
          title: postValues.title,
          slug: postValues.slug,
          content: postValues.content,
          excerpt: postValues.excerpt || null, // Send null instead of empty string
          published: postValues.published,
          author_id: user ? user.id : null, // Handle token-based creation without user
          created_at: timestamp,
          updated_at: timestamp
        };

        console.log('Creating new post:', newPost);

        const { data, error } = await supabase
          .from('blog_posts')
          .insert(newPost)
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          throw error;
        }

        console.log('Post created successfully:', data);
        setSuccess("Blog post created successfully!");
        setIsSubmitted(true);
        
        toast({
          title: "Success",
          description: "Blog post created successfully.",
        });
        
        // Clear form for token-based users or navigate for admins
        if (hasValidToken && !isAdmin) {
          form.reset({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            published: false,
            accessToken: accessToken || '',
          });
        } else {
          navigate(`/blog/${postValues.slug}`);
        }
      }
    } catch (error: any) {
      console.error('Error saving post:', error);
      
      let errorMessage = "Failed to save the blog post.";
      if (error.code === '23505') {
        errorMessage = "A post with this slug already exists. Please use a different slug.";
        form.setError('slug', { 
          type: 'manual', 
          message: errorMessage 
        });
      } else {
        setError(error.message || errorMessage);
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasAccess) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back to blog link */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link to="/blog" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">
                  {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </CardTitle>
                <CardDescription>
                  {isEditing ? 'Make changes to your existing post' : 'Share your thoughts with the world'}
                </CardDescription>
              </div>
              {hasValidToken && !isAdmin && (
                <div className="flex items-center text-amber-600 bg-amber-50 p-2 rounded-md">
                  <LockKeyhole className="h-4 w-4 mr-2" />
                  <span className="text-sm">Using secure token access</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert variant="success" className="mb-6">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            
            {isSubmitted && !isAdmin && (
              <Alert className="mb-6">
                <FileText className="h-4 w-4" />
                <AlertTitle>Post Submitted</AlertTitle>
                <AlertDescription>
                  Your blog post has been submitted successfully. You can create another post below.
                </AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a compelling title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="post-url-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          The URL-friendly version of the title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write a brief summary of your post (optional)" 
                          className="resize-y h-20"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in blog listings (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="my-6" />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4" />
                          <span>Content</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write your blog post content here..." 
                          className="min-h-[300px] font-mono resize-y p-4"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="my-6" />
                
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Publish</FormLabel>
                        <FormDescription>
                          Make this post visible to the public
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Hidden access token field for maintaining the token through form submissions */}
                <FormField
                  control={form.control}
                  name="accessToken"
                  render={({ field }) => (
                    <input type="hidden" {...field} />
                  )}
                />
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => navigate('/blog')}
                  >
                    Cancel
                  </Button>
                  
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate(`/blog/${slug}`)}
                      className="flex items-center"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-metallic-blue hover:bg-metallic-dark"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t py-3 px-6 bg-gray-50 flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Last edited: {new Date().toLocaleDateString()}</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditor;
