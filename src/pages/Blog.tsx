
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon, ArrowLeft, LayoutDashboard, Search, Tag, FileText, PlusCircle, Clock, BookOpen, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from '@/components/ui/alert';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  created_at: string;
  published: boolean;
};

// Blog access token - in production, this should be an env variable or a generated code
const BLOG_ACCESS_TOKEN = "groopsecretblogs2025";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSecretLink, setShowSecretLink] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, excerpt, slug, created_at, published')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
          throw error;
        }
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [toast]);

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
    
    // Filter by category if one is selected
    if (selectedCategory) {
      // In a real app, you'd filter by actual category data
      // This is just a placeholder
      return true;
    }
    
    return true;
  });

  // Separate published posts for regular users
  const publishedPosts = filteredPosts.filter(post => post.published);
  // Drafts for admin users
  const draftPosts = filteredPosts.filter(post => !post.published);
  const isAdmin = user?.role === 'admin';
  
  const categories = [
    'Supply Chain', 'Logistics', 'Inventory Management', 
    'Global Shipping', 'Sustainability'
  ];

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category); // Select the category
    }
  };

  const specialAccessLink = `/blog/new?accessToken=${BLOG_ACCESS_TOKEN}`;

  const copyToClipboard = () => {
    // Get the base URL
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${specialAccessLink}`;
    
    navigator.clipboard.writeText(fullUrl).then(
      () => {
        toast({
          title: "Link Copied",
          description: "The special access link has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy the link. Please try again.",
          variant: "destructive"
        });
      }
    );
  };

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
          <Card className="mb-8">
            <CardContent className="p-8">
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
                  
                  {isAdmin ? (
                    <>
                      <Button asChild className="bg-metallic-blue hover:bg-metallic-dark">
                        <Link to="/blog/new">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Create Post
                        </Link>
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="whitespace-nowrap border-amber-400 text-amber-700 hover:bg-amber-50">
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Share Access
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Special Blog Access Link</DialogTitle>
                            <DialogDescription>
                              Share this link to allow someone to create blog posts without an admin account.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center space-x-2 mt-4">
                            <div className="grid flex-1 gap-2">
                              <Alert className="text-amber-700 bg-amber-50 border-amber-200">
                                <AlertDescription className="break-all">
                                  {window.location.origin}{specialAccessLink}
                                </AlertDescription>
                              </Alert>
                            </div>
                            <Button type="button" onClick={copyToClipboard} className="px-3">
                              <span className="sr-only">Copy</span>
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <DialogFooter className="sm:justify-start mt-4">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <Button asChild className="bg-metallic-blue hover:bg-metallic-dark">
                      <a href={specialAccessLink} onClick={() => setShowSecretLink(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Contribute
                      </a>
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
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center mr-2">
                  <Tag className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">Categories:</span>
                </div>
                {categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategory === category 
                        ? "bg-metallic-blue text-white" 
                        : "hover:bg-gray-100 transition-colors"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : publishedPosts.length === 0 && searchQuery === '' ? (
            <Card className="text-center p-12 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">No blog posts published yet</p>
                <p className="text-gray-500 text-sm mt-2">Check back later for updates and industry insights</p>
                {isAdmin ? (
                  <Button asChild className="mt-6 bg-metallic-blue hover:bg-metallic-dark">
                    <Link to="/blog/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create First Post
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    asChild
                    className="mt-6 bg-metallic-blue hover:bg-metallic-dark"
                  >
                    <a href={specialAccessLink}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Contribute First Post
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : filteredPosts.length === 0 && searchQuery !== '' ? (
            <Card className="text-center p-12 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Search className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">No matching articles found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                  className="mt-6"
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.filter(post => post.published).map((post) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <Link to={`/blog/${post.slug}`} className="group">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-metallic-blue transition-colors flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-400 group-hover:text-metallic-blue" />
                        {post.title}
                      </h3>
                    </Link>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    )}
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-metallic-blue hover:underline flex items-center"
                    >
                      Read more
                      <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* Admin-only section for drafts */}
          {isAdmin && draftPosts.length > 0 && searchQuery === '' && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-yellow-600" />
                Draft Posts
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {draftPosts.map((post) => (
                  <Card key={post.id} className="border-yellow-200 bg-yellow-50/30">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 bg-yellow-50 text-yellow-800 border-yellow-200">
                        Draft
                      </Badge>
                      <Link to={`/blog/${post.slug}`} className="group">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-metallic-blue transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </p>
                    </CardContent>
                    <CardFooter className="px-6 py-4 border-t border-yellow-100 bg-yellow-50 flex justify-end">
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/blog/${post.slug}/edit`}>Edit</Link>
                        </Button>
                        <Button size="sm" asChild className="bg-metallic-blue hover:bg-metallic-dark">
                          <Link to={`/blog/${post.slug}`}>Preview</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
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
