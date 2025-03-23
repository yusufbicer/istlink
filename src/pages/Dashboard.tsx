
import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from '@/lib/auth';
import ErrorBoundary from '@/components/ui/error-boundary';
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
    
    // Wrap each component with ErrorBoundary for better error handling
    const withErrorBoundary = (Component: React.ComponentType) => (
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    );

    // Improved routing map better aligned with the consolidation workflow
    switch (path) {
      case '/dashboard':
        return withErrorBoundary(Overview);
      case '/dashboard/suppliers':
        return withErrorBoundary(Suppliers);
      case '/dashboard/orders':
        return withErrorBoundary(Orders);
      case '/dashboard/shipping':
        return withErrorBoundary(Shipping);
      case '/dashboard/products':
        return withErrorBoundary(Products);
      case '/dashboard/analytics':
        return withErrorBoundary(Analytics);
      case '/dashboard/tracking':
        return withErrorBoundary(Tracking);
      case '/dashboard/settings':
        return withErrorBoundary(Settings);
      case '/dashboard/users':
        return withErrorBoundary(Users);
      case '/dashboard/notes':
        return withErrorBoundary(Notes);
      case '/dashboard/consolidations':
        return withErrorBoundary(Consolidations);
      case '/dashboard/payments':
        return withErrorBoundary(Payments);
      default:
        return withErrorBoundary(Overview);
    }
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
