
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { formatBlogDate } from '@/lib/dateUtils';
import { useTranslation } from 'react-i18next';

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
  slug: string;
  image_url: string | null;
  published: boolean;
}

const BlogPreview = () => {
  const isMobile = useIsMobile();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    fetchLatestBlogPosts();
  }, []);

  const fetchLatestBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id, 
          title, title_en, title_tr, title_fr,
          excerpt, excerpt_en, excerpt_tr, excerpt_fr,
          created_at, 
          slug, 
          image_url, 
          published
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      // Silent error handling for production
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render the section if there are no blog posts or still loading
  if (isLoading || blogPosts.length === 0) {
    return null;
  }

  return (
    <section className={`${isMobile ? 'py-8' : 'py-20'} bg-gradient-to-b from-gray-50 to-white`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`text-center ${isMobile ? 'mb-6' : 'mb-12'}`}>
          <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-3">
            {t('latestInsights')}
          </div>
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-bold text-gray-900 mb-3`}>
            {t('latestInsights')}
          </h2>
          <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 max-w-2xl mx-auto`}>
            {t('stayUpdatedWithTrends')}
          </p>
        </div>

        {isMobile ? (
          // Mobile: Compact card layout
          <div className="space-y-3">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center">
                  {post.image_url && (
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-3 flex-grow min-w-0">
                    <h3 className="font-medium text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {getTranslatedContent(post, 'title')}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatBlogDate(post.created_at, i18n.language, t, 'short')}
                    </div>
                  </div>
                  <div className="flex items-center pr-3">
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Desktop: Elegant professional card grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                {post.image_url && (
                  <div className="aspect-[16/10] overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-medium text-base text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {getTranslatedContent(post, 'title')}
                  </h3>
                  {getTranslatedContent(post, 'excerpt') && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {getTranslatedContent(post, 'excerpt')}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1.5" />
                      {formatBlogDate(post.created_at, i18n.language, t, 'short')}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className={`text-center ${isMobile ? 'mt-6' : 'mt-12'}`}>
          <Link
            to="/blog"
            className={`inline-flex items-center ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'} bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm`}
          >
            {t('viewAllArticles')}
            <ArrowRight className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} ml-2`} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
