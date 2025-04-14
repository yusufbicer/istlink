
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarIcon, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/lib/auth';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  author_id: string;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, you'd check for admin role
  const isAdmin = !!user && post?.author_id === user.id;

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            // Post not found
            navigate('/blog');
            return;
          }
          throw error;
        }
        
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast({
          title: "Error",
          description: "Failed to load the blog post. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, navigate, toast]);

  const handleDeletePost = async () => {
    if (!post) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      
      navigate('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete the blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTogglePublish = async () => {
    if (!post) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published, updated_at: new Date().toISOString() })
        .eq('id', post.id);
      
      if (error) throw error;
      
      setPost({
        ...post,
        published: !post.published,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: `Post ${post.published ? 'unpublished' : 'published'} successfully`,
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update the blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-center">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <p className="mb-6">The blog post you're looking for doesn't exist or may have been removed.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Only show published posts to non-admins
  if (!post.published && !isAdmin) {
    navigate('/blog');
    return null;
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

      <article className="max-w-3xl mx-auto">
        {/* Admin controls */}
        {isAdmin && (
          <div className="flex items-center justify-end mb-6 space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/blog/${post.slug}/edit`} className="flex items-center">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
            
            <Button 
              variant={post.published ? "outline" : "default"}
              size="sm"
              onClick={handleTogglePublish}
            >
              {post.published ? 'Unpublish' : 'Publish'}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeletePost}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {/* Draft warning */}
        {!post.published && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-3 mb-6">
            This post is currently unpublished and only visible to you.
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </time>
          </div>
        </header>

        <div className="prose max-w-none">
          {/* Render post content - in a real app we'd use a markdown renderer */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
