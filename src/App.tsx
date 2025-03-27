
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import WhatsAppButton from "./components/common/WhatsAppButton";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogManagement from "./pages/BlogManagement";

// Dashboard components
import Overview from './components/dashboard/Overview';
import Suppliers from './components/dashboard/Suppliers';
import Orders from './components/dashboard/Orders';
import Shipping from './components/dashboard/Shipping';
import Products from './components/dashboard/Products';
import Analytics from './components/dashboard/Analytics';
import Tracking from './components/dashboard/Tracking';
import Settings from './components/dashboard/Settings';
import Users from './components/dashboard/Users';
import Notes from './components/dashboard/Notes';
import Consolidations from './components/dashboard/Consolidations';
import Payments from './components/dashboard/Payments';

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
            
            {/* Dashboard with nested routes */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="/dashboard/overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="products" element={<Products />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="tracking" element={<Tracking />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="notes" element={<Notes />} />
              <Route path="consolidations" element={<Consolidations />} />
              <Route path="payments" element={<Payments />} />
            </Route>
            
            <Route path="/dashboard/blog-management" element={<BlogManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
