import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/lib/auth';
import { Menu, X } from 'lucide-react';
import { useIsTablet } from '@/hooks/use-mobile';
import IstLinqLogo from '@/components/common/IstLinqLogo';

const Header = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isTablet = useIsTablet();

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

  const handleNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center">
                <IstLinqLogo size="lg" />
                {/* Enhanced istLinq branding with two-color text - removed tagline */}
                <div className="ml-4">
                  <div className="flex items-baseline">
                    <span className="font-bold text-3xl text-blue-600 tracking-tight">ist</span>
                    <span className="font-bold text-3xl text-emerald-600 tracking-tight">Linq</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* Enhanced navigation with better styling */}
            <div className={`flex ${isTablet ? 'space-x-4' : 'space-x-8'}`}>
              <button 
                onClick={() => scrollToSection('features')}
                className={`relative text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-emerald-50`}
              >
                Features
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-emerald-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className={`relative text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-emerald-50`}
              >
                How It Works
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-emerald-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className={`relative text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-emerald-50`}
              >
                Pricing
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-emerald-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </button>
              <button
                onClick={() => handleNavigate('/blog')}
                className={`relative text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-emerald-50`}
              >
                Blog
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-emerald-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                onClick={() => handleNavigate('/dashboard')}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                onClick={() => handleNavigate('/early-access')}
              >
                {isTablet ? "Early Access" : "Request Early Access"}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu - Improved visibility and spacing */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down">
            <div className="flex flex-col py-4 px-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigate('/blog')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left"
              >
                Blog
              </button>
              
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 font-semibold"
                    onClick={() => handleNavigate('/dashboard')}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 font-semibold"
                    onClick={() => handleNavigate('/early-access')}
                  >
                    Request Early Access
                  </Button>
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
