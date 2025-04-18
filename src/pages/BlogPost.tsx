
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const BlogPost = () => {
  // Placeholder data
  const post = {
    title: "Welcome to our Blog",
    content: "This is a placeholder post. Supabase integration will be added later.",
    created_at: new Date().toISOString(),
    excerpt: "A sample blog post to showcase the layout",
    published: true
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <Link to="/blog" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </div>

        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500" dateTime={post.created_at}>
                    {format(new Date(post.created_at), 'MMMM d, yyyy')}
                  </time>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </header>

              {post.excerpt && (
                <div className="mb-8">
                  <p className="text-lg text-gray-600 italic border-l-4 border-metallic-blue pl-4 py-1">
                    {post.excerpt}
                  </p>
                </div>
              )}

              <div className="prose max-w-none text-gray-800">
                <p className="mb-6 leading-relaxed">{post.content}</p>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="max-w-3xl mx-auto">
              <Separator className="my-8" />
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100">Supply Chain</Badge>
                <Badge variant="outline" className="bg-gray-50 hover:bg-gray-100">Logistics</Badge>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
