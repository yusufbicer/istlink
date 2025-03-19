
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
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
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                ShipSync
              </span>
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
              &copy; {new Date().getFullYear()} ShipSync. All rights reserved.
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
