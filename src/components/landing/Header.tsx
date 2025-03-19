
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from '@/lib/auth';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              ShipSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link to="/#how-it-works" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link to="/#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard" className="px-5 py-2">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login" className="px-5 py-2">
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register" className="px-5 py-2">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down">
            <div className="flex flex-col py-4 px-6 space-y-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/#features" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/#how-it-works" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/#pricing" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <Button asChild className="w-full">
                    <Link 
                      to="/dashboard" 
                      className="justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button asChild variant="outline" className="w-full">
                      <Link 
                        to="/login" 
                        className="justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link 
                        to="/register" 
                        className="justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
