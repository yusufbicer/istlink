
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  created_at: string;
  published: boolean;
};

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, excerpt, slug, created_at, published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const publishedPosts = posts.filter(post => post.published);
  const draftPosts = posts.filter(post => !post.published);
  const isAdmin = !!user; // In a real app, you'd check for admin role

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Back to home link */}
      <div className="mb-8">
        <Link to="/" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">GROOP Blog</h1>
            <p className="text-gray-600 mt-2">
              Industry insights and updates on global supply chain management
            </p>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </Link>
              </Button>
              <Button asChild>
                <Link to="/blog/new">Create Post</Link>
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading posts...</p>
          </div>
        ) : publishedPosts.length === 0 && !isAdmin ? (
          <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600">Our blog section is coming soon.</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for updates and industry insights.</p>
          </div>
        ) : (
          <>
            {publishedPosts.length > 0 && (
              <div className="space-y-10">
                <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
                {publishedPosts.map((post) => (
                  <article key={post.id} className="border-b border-gray-200 pb-8 mb-8 last:border-0">
                    <Link to={`/blog/${post.slug}`} className="group">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-metallic-blue transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    {post.excerpt && <p className="text-gray-600 mb-4">{post.excerpt}</p>}
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                      <span className="mx-2">•</span>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-metallic-blue hover:underline"
                      >
                        Read more
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
            
            {/* Admin-only section for drafts */}
            {isAdmin && draftPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Draft Posts</h2>
                <div className="space-y-6">
                  {draftPosts.map((post) => (
                    <article key={post.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/blog/${post.slug}`} className="group">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-metallic-blue transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">
                            Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/blog/${post.slug}/edit`}>Edit</Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
