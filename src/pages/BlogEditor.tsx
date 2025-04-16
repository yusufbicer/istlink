
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
import { ArrowLeft, Save, Eye, FileText, Clock, AlertCircle } from 'lucide-react';
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
});

type FormValues = z.infer<typeof formSchema>;

interface BlogPost extends FormValues {
  id?: string;
  author_id?: string;
  created_at?: string;
  updated_at?: string;
}

const BlogEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // In a real app, you'd check for admin role
  const isAdmin = user && user.role === 'admin';

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!isAdmin) {
      console.log("Access denied - Current user:", user);
      navigate('/admin');
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You must be logged in as an admin to edit blog posts."
      });
    }
  }, [isAdmin, navigate, toast, user]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
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

    if (isAdmin) {
      fetchPost();
    }
  }, [slug, form, navigate, toast, isAdmin]);

  const onSubmit = async (values: FormValues) => {
    if (!isAdmin || !user) {
      console.error("Not authorized to save post");
      toast({
        title: "Error",
        description: "You must be logged in as an admin to save blog posts.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Ensure timestamps are in ISO format
      const timestamp = new Date().toISOString();
      
      if (isEditing && slug) {
        console.log("Updating existing post:", values);
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...values,
            updated_at: timestamp,
          })
          .eq('slug', slug);

        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }

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
          title: values.title,
          slug: values.slug,
          content: values.content,
          excerpt: values.excerpt || null, // Send null instead of empty string
          published: values.published,
          author_id: user.id,
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

        toast({
          title: "Success",
          description: "Blog post created successfully.",
        });
        
        navigate(`/blog/${values.slug}`);
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

  if (!isAdmin) {
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
            <CardTitle className="text-3xl">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Make changes to your existing post' : 'Share your thoughts with the world'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
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
