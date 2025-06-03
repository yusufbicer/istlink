
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Share2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <Link to="/blog" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blog
            </Link>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Blog Post Not Available</h1>
              <p className="text-gray-600 mb-4">Blog posts will be available after Supabase integration.</p>
              <Link to="/blog">
                <Button>Back to Blog</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
