
import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              {/* Enhanced istLinq logo with hexagonal attractive design */}
              <div className="relative flex items-center justify-center h-10 w-10 mr-3">
                {/* Hexagonal background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-emerald-500 to-teal-600 transform rotate-12 rounded-lg shadow-lg border border-white/20"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/30 transform rotate-12 rounded-lg"></div>
                {/* Network icon */}
                <Network className="w-5 h-5 text-white relative z-10" />
                {/* Decorative elements */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full blur-sm"></div>
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-bold text-xl text-blue-400">ist</span>
                  <span className="font-bold text-xl text-emerald-400">Linq</span>
                </div>
                <div className="text-xs text-gray-400 font-medium leading-tight">
                  <div>Smart Export</div>
                  <div>Consolidation Solutions</div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Streamline your Turkish supply chain with intelligent consolidation services. 
              Reduce costs, optimize logistics, and scale your international business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@istlinq.com" className="text-gray-400 hover:text-white transition-colors">
                  hello@istlinq.com
                </a>
              </li>
              <li>
                <Link to="/early-access" className="text-gray-400 hover:text-white transition-colors">
                  Request Early Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 istLinq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
