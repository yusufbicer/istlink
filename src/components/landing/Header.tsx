
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
                <IstLinqLogo size="md" />
                {/* Enhanced istLinq branding with two-color text */}
                <div className="ml-3">
                  <div className="flex items-baseline">
                    <span className="font-bold text-2xl text-blue-600 tracking-tight">ist</span>
                    <span className="font-bold text-2xl text-emerald-600 tracking-tight">Linq</span>
                  </div>
                  <div className="text-xs text-gray-600 font-medium leading-tight">
                    <div>Smart Export</div>
                    <div>Consolidation Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* Adjusted spacing for tablet view - further reduced space */}
            <div className={`flex ${isTablet ? 'space-x-3' : 'space-x-8'}`}>
              <button 
                onClick={() => scrollToSection('features')}
                className={`text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors ${isTablet ? 'px-1' : ''}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className={`text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors ${isTablet ? 'px-1' : ''}`}
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className={`text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors ${isTablet ? 'px-1' : ''}`}
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigate('/blog')}
                className={`text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors ${isTablet ? 'px-1' : ''}`}
              >
                Blog
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleNavigate('/dashboard')}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                onClick={() => handleNavigate('/early-access')}
              >
                {isTablet ? "Early Access" : "Request Early Access"}
              </Button>
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

        {/* Mobile Menu - Improved visibility and spacing */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down">
            <div className="flex flex-col py-4 px-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigate('/blog')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
              >
                Blog
              </button>
              
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleNavigate('/dashboard')}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
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
