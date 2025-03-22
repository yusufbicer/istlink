
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';
import { Zap, Atom } from 'lucide-react';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
                  <Zap className="w-5 h-5 text-white absolute" />
                  <Atom className="w-6 h-6 text-white/80 animate-pulse" />
                </div>
                <div className="ml-2">
                  <span className="font-bold text-base text-gray-900">GROOP</span>
                  <span className="block text-xs text-indigo-600 font-medium tracking-wide">BEYOND BORDERS</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <AuthForm type="register" />
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

export default Register;
