
import { Link } from 'react-router-dom';
import IstLinqLogo from '@/components/common/IstLinqLogo';

const Footer = () => {
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
                  <span className="font-bold text-2xl text-blue-600">ist</span>
                  <span className="font-bold text-2xl text-emerald-600">Linq</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Streamline your Turkish supply chain with intelligent consolidation services. 
              Reduce costs, optimize logistics, and scale your international business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-800 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:istlinq@gmail.com" className="text-gray-600 hover:text-gray-800 transition-colors">
                  istlinq@gmail.com
                </a>
              </li>
              <li>
                <Link to="/early-access" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Request Early Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 istLinq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
