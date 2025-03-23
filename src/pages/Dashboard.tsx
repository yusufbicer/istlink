
import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Determine which component to render based on the path
  const renderContent = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') {
      return <Overview />;
    } else if (path === '/dashboard/suppliers') {
      return <Suppliers />;
    } else if (path === '/dashboard/orders') {
      return <Orders />;
    } else if (path === '/dashboard/shipping') {
      return <Shipping />;
    } else if (path === '/dashboard/products') {
      return <Products />;
    } else if (path === '/dashboard/analytics') {
      return <Analytics />;
    } else if (path === '/dashboard/tracking') {
      return <Tracking />;
    } else if (path === '/dashboard/settings') {
      return <Settings />;
    } else if (path === '/dashboard/users') {
      return <Users />;
    } else if (path === '/dashboard/notes') {
      return <Notes />;
    } else if (path === '/dashboard/consolidations') {
      return <Consolidations />;
    } else if (path === '/dashboard/payments') {
      return <Payments />;
    }
    
    // Default to Overview if no matching path
    return <Overview />;
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gray-50 text-gray-900">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
