
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form';
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
})

const BlogEditor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
    },
    mode: "onChange",
  })

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
          setFormData({
            title: data.title,
            slug: data.slug,
            content: data.content,
          });
          form.setValue("title", data.title)
          form.setValue("slug", data.slug)
          form.setValue("content", data.content)
        } catch (error) {
          console.error('Error fetching post:', error);
          alert('Error fetching post');
        }
      }
    };

    fetchPost();
  }, [id, form]);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content || !formData.slug) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        slug: formData.slug,
        author_id: user?.id || '',
        author_name: user?.email || 'Anonymous',
        updated_at: new Date().toISOString(),
        category: 'General',
        read_time: '5 min read',
        published: true
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);

        if (error) throw error;
      }

      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} onChange={(e) => {
                    field.onChange(e)
                    handleInputChange(e)
                  }} />
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
                  <Input placeholder="Enter post slug" {...field} onChange={(e) => {
                    field.onChange(e)
                    handleInputChange(e)
                  }} />
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
                  <Textarea placeholder="Enter post content" {...field} onChange={(e) => {
                    field.onChange(e)
                    handleInputChange(e)
                  }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-500 text-white">{editingPost ? 'Update Post' : 'Create Post'}</Button>
          <Button variant="outline" onClick={() => navigate('/blog')}>Cancel</Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogEditor;
