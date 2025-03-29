
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";

// WhatsApp Button
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogManagement from "./pages/BlogManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Dashboard routes - all handled by the Dashboard component with proper role detection */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/importer" element={<Dashboard />} />
            <Route path="/dashboard/supplier" element={<Dashboard />} />
            <Route path="/dashboard/admin" element={<Dashboard />} />
            
            {/* Sub-routes - the Dashboard component will handle the proper views */}
            <Route path="/dashboard/suppliers" element={<Dashboard />} />
            <Route path="/dashboard/orders" element={<Dashboard />} />
            <Route path="/dashboard/shipping" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Dashboard />} />
            <Route path="/dashboard/tracking" element={<Dashboard />} />
            <Route path="/dashboard/settings" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<Dashboard />} />
            <Route path="/dashboard/notes" element={<Dashboard />} />
            <Route path="/dashboard/consolidations" element={<Dashboard />} />
            <Route path="/dashboard/payments" element={<Dashboard />} />
            <Route path="/dashboard/customers" element={<Dashboard />} />
            <Route path="/dashboard/documents" element={<Dashboard />} />
            <Route path="/dashboard/reports" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Dashboard />} />
            <Route path="/dashboard/help" element={<Dashboard />} />
            <Route path="/dashboard/blog-management" element={<Dashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
