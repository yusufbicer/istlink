
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { CalendarDays, Clock, ChevronRight, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insights on Cross-Border Commerce
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert analysis, industry trends, and practical tips for optimizing your Turkish supply chain.
            </p>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="mb-8">
                <Link to="/blog/editor">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-6">
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">Blog posts will be available after Supabase integration.</p>
            {isAdmin && (
              <Link to="/blog/editor">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </Link>
            )}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Want to stay updated with our latest insights?</p>
            <Link 
              to="/early-access"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Subscribe to Our Newsletter
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
