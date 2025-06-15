
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/lib/auth';
import { Menu, X } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import BundleistLogo from '@/components/common/BundleistLogo';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const Header = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

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
      isScrolled ? 'py-2 bg-white/85 backdrop-blur-lg shadow-sm border-b border-white/20' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className={`flex items-center ${isMobile ? '-ml-8' : isTablet ? '-ml-12' : '-ml-4'}`}>
            <BundleistLogo size={isMobile ? "sm" : isTablet ? "xxs" : "md"} showText={true} />
          </Link>

          {/* Desktop Navigation - Improved tablet spacing */}
          <div className="hidden md:flex items-center">
            {/* Enhanced navigation with better tablet spacing */}
            <div className={`flex ${isTablet ? 'space-x-0.5 mx-1' : 'space-x-2'} bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5 shadow-lg`}>
              <button 
                onClick={() => scrollToSection('features')}
                className={`relative ${isTablet ? 'text-xs px-2 py-1.5' : 'text-sm px-4 py-2.5'} font-medium text-gray-800 hover:text-emerald-600 transition-all duration-300 group rounded-full hover:bg-white/80 hover:shadow-md transform hover:scale-105`}
              >
                {t('features')}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className={`relative ${isTablet ? 'text-xs px-2 py-1.5' : 'text-sm px-4 py-2.5'} font-medium text-gray-800 hover:text-emerald-600 transition-all duration-300 group rounded-full hover:bg-white/80 hover:shadow-md transform hover:scale-105`}
              >
                {t('howItWorks')}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className={`relative ${isTablet ? 'text-xs px-2 py-1.5' : 'text-sm px-4 py-2.5'} font-medium text-gray-800 hover:text-emerald-600 transition-all duration-300 group rounded-full hover:bg-white/80 hover:shadow-md transform hover:scale-105`}
              >
                {t('pricing')}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
              </button>
              <button
                onClick={() => handleNavigate('/blog')}
                className={`relative ${isTablet ? 'text-xs px-2 py-1.5' : 'text-sm px-4 py-2.5'} font-medium text-gray-800 hover:text-emerald-600 transition-all duration-300 group rounded-full hover:bg-white/80 hover:shadow-md transform hover:scale-105`}
              >
                {t('blog')}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* CTA Buttons - Improved tablet spacing */}
          <div className={`hidden md:flex items-center ${isTablet ? 'space-x-1' : 'space-x-4'}`}>
            <LanguageSwitcher />
            {user ? (
              <Button 
                className={`bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium border-0 ${isTablet ? 'px-2 py-1 text-xs rounded-md h-8' : 'px-6 rounded-lg'}`}
                onClick={() => handleNavigate('/admin/dashboard')}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                className={`bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium border-0 ${isTablet ? 'px-2 py-1 text-xs rounded-md h-8' : 'px-6 rounded-lg'}`}
                onClick={() => handleNavigate('/early-access')}
              >
                {t('getStarted')}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center p-2 rounded-full hover:bg-white/20 transition-colors duration-200 backdrop-blur-md"
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-slide-down border-b border-white/20">
            <div className="flex flex-col py-4 px-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left hover:bg-emerald-50 rounded-lg px-2"
              >
                {t('features')}
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left hover:bg-emerald-50 rounded-lg px-2"
              >
                {t('howItWorks')}
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left hover:bg-emerald-50 rounded-lg px-2"
              >
                {t('pricing')}
              </button>
              <button
                onClick={() => handleNavigate('/blog')}
                className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors py-2 text-left hover:bg-emerald-50 rounded-lg px-2"
              >
                {t('blog')}
              </button>
              
              <div className="pt-2 border-t border-gray-100 space-y-3">
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
                {user ? (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleNavigate('/admin/dashboard')}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleNavigate('/early-access')}
                  >
                    {t('getStarted')}
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
