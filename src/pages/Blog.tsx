
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { CalendarDays, Clock, ChevronRight, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { formatBlogDate } from '@/lib/dateUtils';
import { useTranslation } from "react-i18next";
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';

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
    return formatBlogDate(dateString, i18n.language, t, 'medium');
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
      <SEOHead 
        title="Export Insights & Industry Analysis - Turkish Supply Chain Blog"
        description="Expert insights on Turkish export consolidation, supply chain optimization, and cross-border commerce. Stay updated with the latest trends and strategies."
        keywords="Turkish export insights, supply chain blog, export consolidation articles, logistics analysis, Turkish suppliers insights, cross-border commerce trends"
      />
      <StructuredData pageType="blog" />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-200/20 to-blue-200/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative container mx-auto px-6">
            <div 
              className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-700 rounded-full text-sm font-medium mb-6 shadow-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                {t('ourBlog')}
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight px-8 text-center break-words">
                {t('insightsOnCrossBorderCommerce')}
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                {t('expertAnalysisDesc')}
              </p>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="mb-10">
                  <Link to="/blog/editor">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <Plus className="w-5 h-5 mr-3" />
                      {t('createNewPost')}
                    </Button>
                  </Link>
                </div>
              )}

              {/* Enhanced Category Filter */}
              {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                      activeCategory === "All" 
                        ? "bg-white text-blue-700 shadow-lg border border-blue-200" 
                        : "bg-white/50 backdrop-blur-sm text-slate-700 hover:bg-white/80 border border-slate-200/50"
                    }`}
                  >
                    {t('allPosts')}
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                        activeCategory === category 
                          ? "bg-white text-blue-700 shadow-lg border border-blue-200" 
                          : "bg-white/50 backdrop-blur-sm text-slate-700 hover:bg-white/80 border border-slate-200/50"
                      }`}
                    >
                      {t(category)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Enhanced Blog Posts Grid */}
        <section className="relative pb-20">
          <div className="container mx-auto px-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('noBlogPostsYet')}</h3>
                {isAdmin && blogPosts.length === 0 && (
                  <Link to="/blog/editor">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Plus className="w-5 h-5 mr-2" />
                      {t('createFirstPost')}
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id}
                    className={`group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Enhanced Image Container */}
                    {post.image_url && (
                      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <img 
                          src={post.image_url} 
                          alt={getTranslatedContent(post, 'title')}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1.5 bg-white/95 backdrop-blur-sm text-blue-700 rounded-full text-xs font-medium border border-blue-200/50 shadow-sm">
                            {t(post.category)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-8">
                      {/* Enhanced Title */}
                      <h2 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 leading-tight">
                        {getTranslatedContent(post, 'title')}
                      </h2>
                      
                      {/* Enhanced Excerpt */}
                      {getTranslatedContent(post, 'excerpt') && (
                        <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                          {getTranslatedContent(post, 'excerpt')}
                        </p>
                      )}
                     
                      {/* Enhanced Author Section */}
                      <div className="flex items-center mb-6">
                        {post.author_avatar ? (
                          <img 
                            src={post.author_avatar} 
                            alt={post.author_name}
                            className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-blue-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-4 border-2 border-blue-200">
                            <span className="text-blue-700 font-semibold text-sm">
                              {post.author_name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-slate-900">{post.author_name}</p>
                          <p className="text-xs text-slate-500">Author</p>
                        </div>
                      </div>
                      
                      {/* Enhanced Meta Information */}
                      <div className="flex items-center justify-between text-sm text-slate-500 mb-6 pt-4 border-t border-slate-100">
                        <div className="flex items-center">
                          <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
                          {getFormattedDate(post.created_at)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                          {getFormattedReadTime(post.read_time)}
                        </div>
                      </div>
                      
                      {/* Enhanced Action Section */}
                      <div className="flex justify-between items-center">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 group"
                        >
                          {t('readArticle')}
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        
                        {isAdmin && (
                          <Link 
                            to={`/blog/editor/${post.id}`}
                            className="text-slate-400 hover:text-slate-600 transition-colors duration-300 text-sm font-medium"
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
            
            {/* Enhanced Newsletter CTA */}
            <div className="mt-20 max-w-2xl mx-auto">
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 md:p-10 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-20"></div>
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {t('wantToStayUpdated')}
                  </h3>
                  <p className="text-blue-100 text-base md:text-lg mb-6 max-w-xl mx-auto">
                    Get exclusive insights, industry trends, and expert analysis delivered directly to your inbox.
                  </p>
                  <Link 
                    to="/early-access"
                    className="inline-flex items-center bg-white text-blue-700 px-6 py-3 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    {t('subscribeToNewsletterBtn')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
