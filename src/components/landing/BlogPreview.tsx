
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
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
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render the section if there are no blog posts or still loading
  if (isLoading || blogPosts.length === 0) {
    return null;
  }

  return (
    <section className={`${isMobile ? 'py-8' : 'py-12'} bg-white border-t border-gray-100`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('latestInsights')}
          </h2>
          <p className="text-gray-600 text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('stayUpdatedWithTrends')}
          </p>
        </div>

        {isMobile ? (
          // Mobile: Single column with images
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors group"
              >
                <div className="flex">
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-20 h-20 object-cover flex-shrink-0"
                    />
                  )}
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {getTranslatedContent(post, 'title')}
                    </h3>
                    {getTranslatedContent(post, 'excerpt') && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {getTranslatedContent(post, 'excerpt')}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Desktop/Tablet: Two columns with images
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors group"
              >
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {getTranslatedContent(post, 'title')}
                  </h3>
                  {getTranslatedContent(post, 'excerpt') && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {getTranslatedContent(post, 'excerpt')}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(post.created_at), 'MMM d, yyyy')}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {t('viewAllArticles')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
