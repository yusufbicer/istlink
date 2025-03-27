
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';
import { Zap, Atom } from 'lucide-react';

const Login = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  
  // Handle redirection when auth state changes
  useEffect(() => {
    console.log("Login page - Auth effect triggered, user:", !!user, "isLoading:", isLoading);
    
    // If user is authenticated and data is loaded, redirect to dashboard
    if (user && !isLoading) {
      console.log("User is authenticated, redirecting to dashboard");
      setRedirecting(true);
      
      // Force immediate navigation with replace to ensure clean history
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Prevent flash of login form if we're redirecting
  if (redirecting || (user && !isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Atom className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
          <p className="text-lg font-medium text-gray-700">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
                <Zap className="w-5 h-5 text-white absolute" />
                <Atom className="w-6 h-6 text-white/80 animate-pulse" />
              </div>
              <div className="ml-3">
                <span className="font-bold text-xl text-gray-900">GROOP</span>
                <span className="block text-xs text-indigo-600 font-medium tracking-wide">BEYOND BORDERS</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <AuthForm type="login" />
      </main>
      
      <footer className="py-6 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} GROOP. All rights reserved.
            </p>
            <div className="flex mt-4 md:mt-0">
              <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 mx-3">
                Home
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-blue-600 mx-3">
                Privacy
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-blue-600 mx-3">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
