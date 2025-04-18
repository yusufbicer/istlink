
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ArrowLeft, Search, Tag, FileText, Clock, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const Blog = () => {
  // Placeholder data
  const posts = [
    {
      id: '1',
      title: 'Welcome to our Blog',
      excerpt: 'This is a sample blog post to showcase the layout.',
      slug: 'welcome',
      created_at: new Date().toISOString(),
      published: true
    }
  ];

  const categories = [
    'Supply Chain', 'Logistics', 'Inventory Management', 
    'Global Shipping', 'Sustainability'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
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
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search articles..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center mr-2">
                  <Tag className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">Categories:</span>
                </div>
                {categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="outline"
                    className="hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
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
        </div>
      </div>
    </div>
  );
};

export default Blog;
