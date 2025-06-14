
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BundleistLogo from '@/components/common/BundleistLogo';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNewsletterClick = () => {
    navigate('/early-access', { state: { isNewsletter: true } });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="flex items-center mb-6">
              <BundleistLogo size="lg" />
              <div className="ml-4">
                <div className="flex items-center">
                  <span className="font-bold text-2xl tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    <span className="text-teal-600">BUNDLE</span><span className="text-blue-600">IST</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('brandTagline')}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('brandDesc')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Mail className="h-4 w-4 mr-3 text-blue-600" />
                <a href="mailto:bundleist@gmail.com" className="hover:text-blue-600 transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('contactEmail')}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-3 text-teal-600" />
                <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('locationIstanbul')}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold mb-6 text-gray-900 text-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('navigation')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('features')}
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('howItWorks')}
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('pricing')}
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('blog')}
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & CTA */}
          <div className="lg:col-span-4">
            <h3 className="font-semibold mb-6 text-gray-900 text-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('stayUpdated')}
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('stayUpdatedDesc')}
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleNewsletterClick}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 w-full md:w-auto px-6 py-3 font-medium"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {t('subscribeNewsletter')}
              </Button>
              
              {/* Legal Links */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('privacyPolicy')}
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('termsOfService')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              &copy; 2024 İstLink Ltd. {t('allRightsReserved')}
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-500 text-sm mr-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('madeWith')}
              </span>
              <span className="text-red-500">♥</span>
              <span className="text-gray-500 text-sm ml-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('inIstanbul')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
