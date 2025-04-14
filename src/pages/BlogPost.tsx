
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarIcon, Edit, Trash2, ArrowRight, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/lib/auth';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
  const [relatedPosts, setRelatedPosts] = useState<Partial<BlogPost>[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, you'd check for admin role
  const isAdmin = user?.role === 'admin' && post?.author_id === user.id;

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
        
        // Fetch related posts (excluding current post)
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select('title, slug, excerpt, created_at')
          .eq('published', true)
          .neq('slug', slug)
          .order('created_at', { ascending: false })
          .limit(3);
          
        setRelatedPosts(relatedData || []);
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Blog post link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-12"></div>
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="h-10 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4 mb-12"></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-200 animate-pulse rounded w-full mb-3"></div>
            ))}
            <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5 mb-8"></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-200 animate-pulse rounded w-full mb-3"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <p className="mb-6 text-gray-600">The blog post you're looking for doesn't exist or may have been removed.</p>
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

  // Function to format blog content with paragraphs
  const formatContent = (content: string) => {
    if (!content) return '';
    return content.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-6">{paragraph}</p>
    ));
  };

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

        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Admin controls */}
          {isAdmin && (
            <div className="bg-gray-50 border-b p-4 flex items-center justify-end gap-2">
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
            <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-800 p-3">
              <div className="max-w-3xl mx-auto">
                This post is currently unpublished and only visible to you.
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <time dateTime={post.created_at}>
                      {format(new Date(post.created_at), 'MMMM d, yyyy')}
                    </time>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </header>

              {post.excerpt && (
                <div className="mb-8">
                  <p className="text-lg text-gray-600 italic">{post.excerpt}</p>
                </div>
              )}

              <div className="prose max-w-none text-gray-800">
                {formatContent(post.content)}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="px-8 pb-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2 mt-8">
                <Badge variant="outline">Supply Chain</Badge>
                <Badge variant="outline">Logistics</Badge>
                <Badge variant="outline">Global Trade</Badge>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link 
                  key={index} 
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-gray-200"
                >
                  <h3 className="font-semibold mb-2 line-clamp-2 hover:text-metallic-blue transition-colors">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500">
                      {format(new Date(relatedPost.created_at!), 'MMM d, yyyy')}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
