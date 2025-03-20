
import { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import BlogPostManagement from '@/components/blog/BlogPostManagement';

const BlogManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null; // Don't render anything while redirecting
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gray-50 text-gray-900">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-auto">
            <BlogPostManagement />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BlogManagement;
