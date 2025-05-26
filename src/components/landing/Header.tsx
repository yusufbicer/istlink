
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '@/components/common/Logo';
import { useNavigationLinks } from '@/config/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const links = useNavigationLinks();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 z-50 w-full ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'} transition-all duration-300 ease-in-out`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <nav className="relative flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between gap-2">
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 
                    ${location.pathname === link.to 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="ml-4 flex items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/early-access">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              onClick={() => setIsOpen(!isOpen)} 
              size="icon" 
              variant="ghost" 
              className="md:hidden"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-2 pb-4">
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-3 rounded-md text-base font-medium 
                    ${location.pathname === link.to
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <Button asChild className="mt-2 w-full">
                <Link to="/early-access">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
