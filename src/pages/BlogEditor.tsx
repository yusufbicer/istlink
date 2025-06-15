
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
  title_en: z.string().optional(),
  title_tr: z.string().optional(),
  title_fr: z.string().optional(),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  excerpt: z.string().optional(),
  excerpt_en: z.string().optional(),
  excerpt_tr: z.string().optional(),
  excerpt_fr: z.string().optional(),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  content_en: z.string().optional(),
  content_tr: z.string().optional(),
  content_fr: z.string().optional(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  content_type: z.enum(["blog_post", "industry_news"]).default("blog_post"),
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
          form.setValue("title_en", data.title_en || "");
          form.setValue("title_tr", data.title_tr || "");
          form.setValue("title_fr", data.title_fr || "");
          form.setValue("slug", data.slug);
          form.setValue("excerpt", data.excerpt || "");
          form.setValue("excerpt_en", data.excerpt_en || "");
          form.setValue("excerpt_tr", data.excerpt_tr || "");
          form.setValue("excerpt_fr", data.excerpt_fr || "");
          form.setValue("content", data.content);
          form.setValue("content_en", data.content_en || "");
          form.setValue("content_tr", data.content_tr || "");
          form.setValue("content_fr", data.content_fr || "");
          form.setValue("category", data.category);
          form.setValue("content_type", (data.content_type === "industry_news" ? "industry_news" : "blog_post") as "blog_post" | "industry_news");
          form.setValue("author_name", data.author_name || "");
          form.setValue("image_url", data.image_url || "");
        } catch (error) {
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


    setIsLoading(true);

    try {
      const postData = {
        title: values.title,
        title_en: values.title_en || null,
        title_tr: values.title_tr || null,
        title_fr: values.title_fr || null,
        content: values.content,
        content_en: values.content_en || null,
        content_tr: values.content_tr || null,
        content_fr: values.content_fr || null,
        slug: values.slug,
        excerpt: values.excerpt || null,
        excerpt_en: values.excerpt_en || null,
        excerpt_tr: values.excerpt_tr || null,
        excerpt_fr: values.excerpt_fr || null,
        category: values.category,
        content_type: values.content_type || 'blog_post',
        author_id: user.id,
        author_name: values.author_name,
        image_url: values.image_url || null,
        updated_at: new Date().toISOString(),
        read_time: '5 min read',
        published: true
      };

      

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) {
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
          throw error;
        }

        toast({
          title: "Success",
          description: "Blog post created successfully!"
        });
      }

      navigate('/blog');
    } catch (error: any) {
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                name="content_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="blog_post">Blog Post</option>
                        <option value="industry_news">Industry News</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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

            {/* Translation Fields */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Translations (Optional)</h3>
              
              {/* English Translations */}
              <div className="space-y-4 mb-6">
                <h4 className="text-md font-medium text-gray-700">English 🇺🇸</h4>
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (English)</FormLabel>
                      <FormControl>
                        <Input placeholder="English title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt (English)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="English excerpt..." rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (English)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="English content..." rows={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Turkish Translations */}
              <div className="space-y-4 mb-6">
                <h4 className="text-md font-medium text-gray-700">Turkish 🇹🇷</h4>
                <FormField
                  control={form.control}
                  name="title_tr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Turkish)</FormLabel>
                      <FormControl>
                        <Input placeholder="Turkish title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt_tr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt (Turkish)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Turkish excerpt..." rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content_tr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (Turkish)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Turkish content..." rows={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* French Translations */}
              <div className="space-y-4 mb-6">
                <h4 className="text-md font-medium text-gray-700">French 🇫🇷</h4>
                <FormField
                  control={form.control}
                  name="title_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (French)</FormLabel>
                      <FormControl>
                        <Input placeholder="French title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt (French)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="French excerpt..." rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (French)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="French content..." rows={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
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
