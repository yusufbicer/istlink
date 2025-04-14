
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
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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

  // In a real app, you'd check for admin role
  const isAdmin = !!user;

  // Redirect if not logged in
  useEffect(() => {
    if (!isAdmin) {
      navigate('/blog');
    }
  }, [isAdmin, navigate]);

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
            published: data.published,
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

    fetchPost();
  }, [slug, form, navigate, toast]);

  const onSubmit = async (values: FormValues) => {
    if (!isAdmin) return;
    
    setIsLoading(true);
    try {
      if (isEditing && slug) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...values,
            updated_at: new Date().toISOString(),
          })
          .eq('slug', slug);

        if (error) throw error;

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
        // Create new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            ...values,
            author_id: user?.id,
          })
          .select();

        if (error) throw error;

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
    <div className="container mx-auto p-6 min-h-screen">
      {/* Back to blog link */}
      <div className="mb-8">
        <Link to="/blog" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to blog
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" {...field} />
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
                    The URL-friendly version of the title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary of your post" 
                      className="resize-y"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    A short summary that appears in blog listings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your blog post content here..." 
                      className="min-h-[300px] font-mono"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish</FormLabel>
                    <FormDescription>
                      Make this post visible to the public.
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
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
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
      </div>
    </div>
  );
};

export default BlogEditor;
