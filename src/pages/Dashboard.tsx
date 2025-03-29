
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from '@/lib/auth';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ImporterDashboard from '@/components/dashboard/ImporterDashboard';
import SupplierDashboard from '@/components/dashboard/SupplierDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<'importer' | 'supplier' | 'admin'>('importer');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Determine user role - in a real app, this would come from your auth system
      // For demo purposes, we'll use a simple approach
      const path = location.pathname;
      if (path.includes('supplier')) {
        setRole('supplier');
      } else if (path.includes('admin')) {
        setRole('admin');
      } else {
        setRole('importer');
      }
    }
  }, [user, navigate, location.pathname]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (role) {
      case 'importer':
        return <ImporterDashboard />;
      case 'supplier':
        return <SupplierDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <ImporterDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gray-50 text-gray-900">
        <Sidebar userRole={role} />
        
        <div className="flex-1 flex flex-col">
          <Header userRole={role} />
          
          <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-auto">
            {renderDashboard()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
