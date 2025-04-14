
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
  updated_at: string | null;
};

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Fetch all blog posts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  // Toggle post published status
  const togglePublishedStatus = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          published: !post.published,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id);

      if (error) throw error;
      
      // Update local state
      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ));
      
      toast({
        title: "Success",
        description: `Post ${post.published ? 'unpublished' : 'published'} successfully.`,
      });
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post status.",
        variant: "destructive",
      });
    }
  };

  // Delete a post
  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setPosts(posts.filter(post => post.id !== id));
      
      toast({
        title: "Success",
        description: "Post deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Back link */}
      <div className="mb-8">
        <Link to="/" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
          </div>
          <Button asChild>
            <Link to="/blog/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Post
            </Link>
          </Button>
        </div>
      
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600">No blog posts yet.</p>
            <p className="text-gray-500 text-sm mt-2">Get started by creating your first blog post.</p>
            <Button asChild className="mt-4">
              <Link to="/blog/new">Create Post</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={post.published}
                          onCheckedChange={() => togglePublishedStatus(post)}
                        />
                        <Badge variant={post.published ? "default" : "outline"}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(post.created_at), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      {post.updated_at ? format(new Date(post.updated_at), 'MMM d, yyyy') : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/blog/${post.slug}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => deletePost(post.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
