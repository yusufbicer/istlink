
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { formatBlogDate } from '@/lib/dateUtils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { useTranslation } from 'react-i18next';

interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  title_tr?: string;
  title_fr?: string;
  content: string;
  content_en?: string;
  content_tr?: string;
  content_fr?: string;
  created_at: string;
  excerpt: string | null;
  excerpt_en?: string;
  excerpt_tr?: string;
  excerpt_fr?: string;
  published: boolean;
  author_name: string;
  author_avatar: string | null;
  category: string;
  image_url: string | null;
  read_time: string;
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  // Helper function to get translated content
  const getTranslatedContent = (post: BlogPost, field: 'title' | 'excerpt' | 'content') => {
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
    } else if (field === 'excerpt') {
      switch (currentLang) {
        case 'tr':
          return post.excerpt_tr || post.excerpt;
        case 'fr':
          return post.excerpt_fr || post.excerpt;
        default:
          return post.excerpt_en || post.excerpt;
      }
    } else {
      switch (currentLang) {
        case 'tr':
          return post.content_tr || post.content;
        case 'fr':
          return post.content_fr || post.content;
        default:
          return post.content_en || post.content;
      }
    }
  };

  // Helper function to format date
  const getFormattedDate = (dateString: string) => {
    return formatBlogDate(dateString, i18n.language, t, 'long');
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

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is admin based on role in auth context
  const isAdmin = user?.role === 'admin';

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-600">{t('loadingBlogPosts')}</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">{t('postNotFound')}</h1>
              <p className="text-gray-600 mb-4">{t('blogPostNotExist')}</p>
              <Link to="/blog">
                <Button>{t('backToBlog')}</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToBlog')}
            </Link>
          </div>

          <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
                {post.image_url && (
                  <div className="w-[calc(100%-2.5rem)] mx-auto aspect-[16/9] max-h-64 md:max-h-80 overflow-hidden rounded-2xl mb-8 shadow-lg">
                    <img 
                      src={post.image_url} 
                      alt={getTranslatedContent(post, 'title')}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                 <header className="mb-8">
                   <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{getTranslatedContent(post, 'title')}</h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {post.author_avatar ? (
                        <img 
                          src={post.author_avatar} 
                          alt={post.author_name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium">
                            {post.author_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{post.author_name}</p>
                        <time className="text-sm text-gray-500" dateTime={post.created_at}>
                          {getFormattedDate(post.created_at)} • {getFormattedReadTime(post.read_time)}
                        </time>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isAdmin && (
                        <Link to={`/blog/editor?id=${post.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            {t('edit')}
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        {t('share')}
                      </Button>
                    </div>
                  </div>
                </header>

                 {getTranslatedContent(post, 'excerpt') && (
                   <div className="mb-8">
                     <p className="text-lg text-gray-600 italic border-l-4 border-blue-600 pl-4 py-1">
                       {getTranslatedContent(post, 'excerpt')}
                     </p>
                   </div>
                 )}

                 <div className="prose max-w-none text-gray-800">
                   <div className="mb-6 leading-relaxed whitespace-pre-line">{getTranslatedContent(post, 'content')}</div>
                 </div>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="max-w-3xl mx-auto">
                <Separator className="my-8" />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100">{t(post.category)}</Badge>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
