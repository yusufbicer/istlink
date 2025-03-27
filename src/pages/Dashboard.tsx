
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from '@/lib/auth';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import Overview from '@/components/dashboard/Overview';
import Suppliers from '@/components/dashboard/Suppliers';
import Orders from '@/components/dashboard/Orders';
import Shipping from '@/components/dashboard/Shipping';
import Products from '@/components/dashboard/Products';
import Analytics from '@/components/dashboard/Analytics';
import Tracking from '@/components/dashboard/Tracking';
import Settings from '@/components/dashboard/Settings';
import Users from '@/components/dashboard/Users';
import Notes from '@/components/dashboard/Notes';
import Consolidations from '@/components/dashboard/Consolidations';
import Payments from '@/components/dashboard/Payments';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Debug
  console.log("[Dashboard] Render - Auth state:", { 
    isAuthenticated: !!user, 
    isLoading, 
    email: user?.email || 'none',
    pathname: location.pathname
  });
  
  // Redirect to login if not authenticated
  useEffect(() => {
    console.log("[Dashboard] Auth check effect - user:", !!user, "isLoading:", isLoading);
    
    // Only redirect after we're sure authentication is complete
    if (!isLoading) {
      if (!user) {
        console.log("[Dashboard] User not authenticated, redirecting to login");
        setIsRedirecting(true);
        navigate('/login', { replace: true });
      } else {
        console.log("[Dashboard] User is authenticated:", user.email);
        
        // If user lands on /dashboard with no sub-route, redirect to overview
        if (location.pathname === '/dashboard') {
          navigate('/dashboard/overview', { replace: true });
        }
      }
    }
  }, [user, isLoading, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isRedirecting || !user) {
    return null; // Don't render anything while redirecting
  }

  // User is authenticated and data is loaded, render the dashboard
  console.log("[Dashboard] Rendering dashboard for authenticated user:", user.email);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gray-50 text-gray-900">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
