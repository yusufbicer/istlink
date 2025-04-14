
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon, ArrowLeft, LayoutDashboard, Search, Tag, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredPosts = posts.filter(post => {
    // Only admins can see unpublished posts
    if (!post.published && (!user || user.role !== 'admin')) {
      return false;
    }
    
    // Filter based on search query
    if (searchQuery) {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return true;
  });

  // Separate published posts for regular users
  const publishedPosts = posts.filter(post => post.published);
  // Drafts for admin users
  const draftPosts = posts.filter(post => !post.published);
  const isAdmin = user?.role === 'admin';
  
  const categories = [
    'Supply Chain', 'Logistics', 'Inventory Management', 
    'Global Shipping', 'Sustainability'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">GROOP Blog</h1>
                <p className="text-gray-600 mt-2">
                  Industry insights and updates on global supply chain management
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {isAdmin && (
                  <Button variant="outline" asChild className="whitespace-nowrap">
                    <Link to="/admin/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                )}
                {isAdmin && (
                  <Button asChild className="bg-metallic-blue hover:bg-metallic-dark">
                    <Link to="/blog/new">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Post
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-10">
              <Tag className="h-4 w-4 text-gray-500 mr-1" />
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-100">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-pulse flex flex-col w-full gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 h-40 rounded-md w-full"></div>
                ))}
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg bg-white shadow-sm">
              {searchQuery ? (
                <>
                  <p className="text-gray-600 font-medium">No matching articles found.</p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms.</p>
                </>
              ) : (
                <>
                  <p className="text-gray-600">Our blog section is coming soon.</p>
                  <p className="text-gray-500 text-sm mt-2">Check back later for updates and industry insights.</p>
                </>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border ${!post.published ? 'border-yellow-200' : 'border-transparent'}`}
                >
                  <div className="p-6">
                    {!post.published && (
                      <Badge variant="outline" className="mb-3 bg-yellow-50 text-yellow-800 border-yellow-200">
                        Draft
                      </Badge>
                    )}
                    <Link to={`/blog/${post.slug}`} className="group">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-metallic-blue transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-500 mt-4">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                      <Separator orientation="vertical" className="mx-3 h-4" />
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-metallic-blue hover:underline"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {/* Admin-only section for drafts */}
          {isAdmin && draftPosts.length > 0 && searchQuery === '' && (
            <div className="mt-12 pt-8">
              <h2 className="text-2xl font-semibold mb-6">Draft Posts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {draftPosts.map((post) => (
                  <article key={post.id} className="p-6 bg-gray-50 rounded-lg border border-yellow-100">
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
        </div>
      </div>
    </div>
  );
};

export default BlogList;
