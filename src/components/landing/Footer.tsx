
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BundleistLogo from '@/components/common/BundleistLogo';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleNewsletterClick = () => {
    navigate('/early-access', { state: { isNewsletter: true } });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className={`container mx-auto px-6 ${isMobile ? "py-3" : "py-16"}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-8 ${isMobile ? "gap-2" : "gap-8 lg:gap-12"}`}>
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className={`flex items-center ${isMobile ? "mb-1" : "mb-6"}`}>
              <BundleistLogo size="lg" showText={true} />
            </div>
            
            <p className={`text-gray-600 ${isMobile ? "mb-1 text-sm" : "mb-6"} max-w-md leading-relaxed`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('brandDesc')}
            </p>

            {/* Contact Info */}
            <div className={isMobile ? "space-y-1" : "space-y-3"}>
              <div className="flex items-center text-gray-700">
                <Mail className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-2 text-blue-600`} />
                <a href="mailto:bundleist@gmail.com" className={`hover:text-blue-600 transition-colors ${isMobile ? "text-sm" : ""}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('contactEmail')}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-2 text-teal-600`} />
                <span className={isMobile ? "text-sm" : ""} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('locationIstanbul')}
                </span>
              </div>
            </div>
          </div>


          {/* Newsletter & CTA */}
          <div className="lg:col-span-4">
            <h3 className={`font-semibold ${isMobile ? "mb-1 text-sm" : "mb-6 text-lg"} text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('stayUpdated')}
            </h3>
            <p className={`text-gray-600 ${isMobile ? "mb-1 text-sm" : "mb-6"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('stayUpdatedDesc')}
            </p>
            
            <div className={isMobile ? "space-y-2" : "space-y-4"}>
              <Button 
                onClick={handleNewsletterClick}
                className={`bg-blue-600 hover:bg-blue-700 text-white border-0 w-full md:w-auto ${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {t('subscribeNewsletter')}
              </Button>
              
              {/* Legal Links */}
              <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${isMobile ? "pt-2" : "pt-4"}`}>
                <button className={`text-gray-500 hover:text-gray-700 transition-colors ${isMobile ? "text-sm" : "text-sm"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('privacyPolicy')}
                </button>
                <button className={`text-gray-500 hover:text-gray-700 transition-colors ${isMobile ? "text-sm" : "text-sm"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('termsOfService')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-gray-200 ${isMobile ? "mt-2 pt-1" : "mt-12 pt-8"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-gray-500 ${isMobile ? "text-sm" : "text-sm"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              &copy; 2025 Bundleist Ltd. {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
