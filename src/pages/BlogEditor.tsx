
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  excerpt: z.string().optional(),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  author_name: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  image_url: z.string().url().optional().or(z.literal("")),
})

const BlogEditor = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "General",
      author_name: "",
      image_url: "",
    },
    mode: "onChange",
  })

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to access this page.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (user && user.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
      navigate('/blog');
    }
  }, [user, isAuthenticated, navigate, toast]);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;

          setEditingPost(data);
          form.setValue("title", data.title);
          form.setValue("slug", data.slug);
          form.setValue("excerpt", data.excerpt || "");
          form.setValue("content", data.content);
          form.setValue("category", data.category);
          form.setValue("author_name", data.author_name || "");
          form.setValue("image_url", data.image_url || "");
        } catch (error) {
          console.error('Error fetching post:', error);
          toast({
            title: "Error",
            description: "Failed to load blog post.",
            variant: "destructive"
          });
        }
      }
    };

    fetchPost();
  }, [id, form, toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user || !isAuthenticated) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create posts.",
        variant: "destructive"
      });
      return;
    }

    console.log('Current user:', user);
    console.log('User ID:', user.id);
    console.log('User authenticated:', isAuthenticated);

    setIsLoading(true);

    try {
      const postData = {
        title: values.title,
        content: values.content,
        slug: values.slug,
        excerpt: values.excerpt || null,
        category: values.category,
        author_id: user.id,
        author_name: values.author_name,
        image_url: values.image_url || null,
        updated_at: new Date().toISOString(),
        read_time: '5 min read',
        published: true
      };

      console.log('Post data being inserted:', postData);

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) {
          console.error('Update error:', error);
          throw error;
        }

        toast({
          title: "Success",
          description: "Blog post updated successfully!"
        });
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(postData)
          .select();

        if (error) {
          console.error('Insert error:', error);
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }

        console.log('Insert successful:', data);

        toast({
          title: "Success",
          description: "Blog post created successfully!"
        });
      }

      navigate('/blog');
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    form.setValue('slug', slug);
  };

  if (user && user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="mb-8">
        <Link to="/blog" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to blog
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {editingPost ? 'Edit Post' : 'Create New Post'}
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
                    <Input 
                      placeholder="Enter post title" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleTitleChange(e.target.value);
                      }}
                    />
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
                    <Input placeholder="enter-post-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter author name"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg"
                      {...field} 
                    />
                  </FormControl>
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
                      placeholder="Brief summary of the post..."
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Supply Chain, E-commerce, Logistics" {...field} />
                  </FormControl>
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
                      rows={20}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isLoading || !isAuthenticated}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/blog')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BlogEditor;
