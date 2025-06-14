
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { CalendarDays, Clock, ChevronRight, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  title_tr?: string;
  title_fr?: string;
  excerpt: string | null;
  excerpt_en?: string;
  excerpt_tr?: string;
  excerpt_fr?: string;
  created_at: string;
  read_time: string;
  category: string;
  image_url: string | null;
  author_name: string;
  author_avatar: string | null;
  slug: string;
  published: boolean;
}

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  // Helper function to get translated content
  const getTranslatedContent = (post: BlogPost, field: 'title' | 'excerpt') => {
    const currentLang = i18n.language;
    
    if (field === 'title') {
      switch (currentLang) {
        case 'tr':
          return post.title_tr || post.title;
        case 'fr':
          return post.title_fr || post.title;
        default:
          return post.title_en || post.title;
      }
    } else {
      switch (currentLang) {
        case 'tr':
          return post.excerpt_tr || post.excerpt;
        case 'fr':
          return post.excerpt_fr || post.excerpt;
        default:
          return post.excerpt_en || post.excerpt;
      }
    }
  };

  // Helper function to format date
  const getFormattedDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Helper function to format reading time
  const getFormattedReadTime = (readTime: string) => {
    const match = readTime.match(/(\d+)/);
    if (match) {
      const number = match[1];
      return `${number} ${t('minRead')}`;
    }
    return readTime;
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory, blogPosts]);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      // Silent error handling for production
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from blog posts
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-gray-600">{t('loadingBlogPosts')}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-50 text-blue-600 rounded-full mb-3">
              {t('ourBlog')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('insightsOnCrossBorderCommerce')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('expertAnalysisDesc')}
            </p>

            {/* Admin Controls - Only show if admin */}
            {isAdmin && (
              <div className="mb-8">
                <Link to="/blog/editor">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('createNewPost')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === "All" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t('allPosts')}
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t(category)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">{t('noBlogPostsYet')}</p>
              {/* Only show create first post button if user is admin and there are no posts at all */}
              {isAdmin && blogPosts.length === 0 && (
                <Link to="/blog/editor">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('createFirstPost')}
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article 
                  key={post.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {post.image_url && (
                    <div className="relative">
                      <img 
                        src={post.image_url} 
                        alt={getTranslatedContent(post, 'title')}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                        {t(post.category)}
                      </span>
                    </div>
                  )}
                  
                   <div className="p-6">
                     <h2 className="text-xl font-bold mb-2 line-clamp-2">
                       {getTranslatedContent(post, 'title')}
                     </h2>
                     {getTranslatedContent(post, 'excerpt') && (
                       <p className="text-gray-600 mb-4 line-clamp-3">
                         {getTranslatedContent(post, 'excerpt')}
                       </p>
                     )}
                    
                    <div className="flex items-center mb-4">
                      {post.author_avatar ? (
                        <img 
                          src={post.author_avatar} 
                          alt={post.author_name}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium text-sm">
                            {post.author_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium">
                        {post.author_name}
                      </span>
                    </div>
                    
                     <div className="flex items-center justify-between text-sm text-gray-500">
                       <div className="flex items-center">
                         <CalendarDays className="w-4 h-4 mr-1" />
                         {getFormattedDate(post.created_at)}
                       </div>
                       <div className="flex items-center">
                         <Clock className="w-4 h-4 mr-1" />
                         {getFormattedReadTime(post.read_time)}
                       </div>
                     </div>
                    
                    <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between items-center">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 font-medium hover:underline"
                      >
                        {t('readArticle')}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                      
                      {isAdmin && (
                        <Link 
                          to={`/blog/editor/${post.id}`}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {t('edit')}
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">{t('wantToStayUpdated')}</p>
            <Link 
              to="/early-access"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {t('subscribeToNewsletterBtn')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
