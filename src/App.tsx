
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";

// WhatsApp Button
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Pages
import Index from "./pages/Index";
import EarlyAccess from "./pages/EarlyAccess";
import Blog from "./pages/Blog";
import BlogAndNews from "./pages/BlogAndNews";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper for admin-only routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/blog" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/early-access" element={<EarlyAccess />} />
      <Route path="/blog" element={<BlogAndNews />} />
      <Route path="/blog-old" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/blog/editor" element={
        <AdminRoute>
          <BlogEditor />
        </AdminRoute>
      } />
      <Route path="/blog/editor/:id" element={
        <AdminRoute>
          <BlogEditor />
        </AdminRoute>
      } />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<Navigate to="/auth" replace />} />
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
          <WhatsAppButton />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
