
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from '@/lib/auth';
import { Menu, X, Zap } from 'lucide-react';
import RequestAccessForm from '@/components/forms/RequestAccessForm';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

const Header = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

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
                {/* Metallic blue logo */}
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-metallic-blue to-metallic-light relative overflow-hidden">
                  <Zap className="w-5 h-5 text-white absolute" />
                </div>
                <div className="ml-3">
                  <span className="font-bold text-xl text-gray-900">GROOP</span>
                  <span className="block text-xs text-metallic-blue font-medium tracking-wide">BEYOND BORDERS</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors"
            >
              How It Works
            </button>
            <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors">
              Blog
            </Link>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button asChild className="bg-metallic-blue hover:bg-metallic-dark">
                <Link to="/dashboard" className="px-5 py-2">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button 
                className="bg-metallic-blue hover:bg-metallic-dark text-white px-5 py-2"
                onClick={() => setIsRequestFormOpen(true)}
              >
                Request Access
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down">
            <div className="flex flex-col py-4 px-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors py-2 text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors py-2 text-left"
              >
                How It Works
              </button>
              <Link 
                to="/blog" 
                className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors py-2 text-left w-full block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-gray-700 hover:text-metallic-blue transition-colors py-2 text-left"
              >
                Pricing
              </button>
              
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <Button asChild className="w-full bg-metallic-blue hover:bg-metallic-dark">
                    <Link 
                      to="/dashboard" 
                      className="justify-center text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-metallic-blue hover:bg-metallic-dark text-white justify-center"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsRequestFormOpen(true);
                    }}
                  >
                    Request Access
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Request Access Dialog */}
      <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Request Access</DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill out the form below to request access to GROOP's consolidated shipping platform.
            </DialogDescription>
          </DialogHeader>
          <RequestAccessForm onClose={() => setIsRequestFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
