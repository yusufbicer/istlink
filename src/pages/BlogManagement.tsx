
import React from 'react';
import BlogPostManagement from '@/components/blog/BlogPostManagement';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';

const BlogManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  if (!user || user.role !== 'admin') {
    toast({
      title: "Access Denied",
      description: "You do not have permission to access this page.",
      variant: "destructive"
    });
    navigate('/dashboard');
    return null;
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole={user.role} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
          <BlogPostManagement />
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
