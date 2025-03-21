
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from '@/lib/auth';
import { Menu, X, Zap, Atom } from 'lucide-react';

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
                {/* New modern and futuristic logo */}
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
                  <Zap className="w-5 h-5 text-white absolute" />
                  <Atom className="w-6 h-6 text-white/80 animate-pulse" />
                </div>
                <div className="ml-3">
                  <span className="font-bold text-xl text-gray-900">GROOP</span>
                  <span className="block text-xs text-indigo-600 font-medium tracking-wide">BEYOND BORDERS</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              How It Works
            </button>
            <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              Blog
            </Link>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/dashboard" className="px-5 py-2">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                  <Link to="/login" className="px-5 py-2">
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
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
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2"
              >
                How It Works
              </button>
              <Link 
                to="/blog" 
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2"
              >
                Pricing
              </button>
              
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
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
                    <Button asChild variant="outline" className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                      <Link 
                        to="/login" 
                        className="justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
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
