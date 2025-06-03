
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import IstLinqLogo from '@/components/common/IstLinqLogo';

const Footer = () => {
  const navigate = useNavigate();

  const handleNewsletterClick = () => {
    navigate('/early-access', { state: { isNewsletter: true } });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <IstLinqLogo size="lg" />
              <div className="ml-4">
                <div className="flex items-baseline">
                  <span className="font-bold text-2xl text-blue-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>ist</span>
                  <span className="font-bold text-2xl text-emerald-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Linq</span>
                </div>
                <p className="text-xs text-gray-700 mt-1 font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Simplifying Cross Border Procurement
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Streamline your Turkish supply chain with intelligent consolidation services. 
              Reduce costs, optimize logistics, and scale your international business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Terms of Service
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-800 transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-gray-800 transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Stay Updated</h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Button 
                  onClick={handleNewsletterClick}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-3"
                >
                  Subscribe to Newsletter
                </Button>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-700" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Contact</h4>
                <a href="mailto:istlinq@gmail.com" className="text-gray-600 hover:text-gray-800 transition-colors text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  istlinq@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>&copy; 2024 İstLinq Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
