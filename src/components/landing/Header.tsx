
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

  // Smooth scroll function for anchor links
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5Z" fill="#2563EB"/>
                  <path d="M34 18C27.4 18 22 23.4 22 30C22 36.6 27.4 42 34 42C40.6 42 46 36.6 46 30C46 23.4 40.6 18 34 18Z" fill="white"/>
                  <path d="M26 24C21.6 24 18 27.6 18 32C18 36.4 21.6 40 26 40C30.4 40 34 36.4 34 32C34 27.6 30.4 24 26 24Z" fill="#1E40AF"/>
                  <path d="M20 30C16.7 30 14 32.7 14 36C14 39.3 16.7 42 20 42C23.3 42 26 39.3 26 36C26 32.7 23.3 30 20 30Z" fill="white"/>
                </svg>
                <div className="ml-3">
                  <span className="font-bold text-xl text-gray-900">Groop</span>
                  <span className="block text-xs text-gray-500">Complexity Consolidated</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              How It Works
            </button>
            <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pricing
            </button>
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
              <button 
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                How It Works
              </button>
              <Link 
                to="/blog" 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Pricing
              </button>
              
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
