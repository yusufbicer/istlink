
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
      <div className={`container mx-auto ${isMobile ? "px-4 py-6" : "px-6 py-16"}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${isMobile ? "gap-6" : "gap-8 lg:gap-12 items-start"}`}>
          
          {/* Brand Section */}
          <div className={`${isMobile ? "" : "pr-8"}`}>
            <div className={`flex items-baseline ${isMobile ? "mb-4" : "mb-6"}`}>
              <BundleistLogo size={isMobile ? "xs" : "sm"} showText={true} />
            </div>
            
            <p className={`text-gray-600 ${isMobile ? "mb-4 text-sm" : "mb-6"} max-w-md leading-relaxed`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('brandDesc')}
            </p>

            {/* Contact Info */}
            <div className={isMobile ? "space-y-2" : "space-y-3"}>
              <div className="flex items-center text-gray-700">
                <Mail className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-3 text-blue-600 flex-shrink-0`} />
                <a href="mailto:bundleist@gmail.com" className={`hover:text-blue-600 transition-colors ${isMobile ? "text-sm" : ""}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('contactEmail')}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-3 text-teal-600 flex-shrink-0`} />
                <span className={isMobile ? "text-sm" : ""} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('locationIstanbul')}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter & CTA */}
          <div className={`${isMobile ? "" : "pl-8 flex flex-col justify-start"}`}>
            <h3 className={`font-semibold ${isMobile ? "mb-3 text-base" : "mb-6 text-lg leading-none"} text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('stayUpdated')}
            </h3>
            <p className={`text-gray-600 ${isMobile ? "mb-4 text-sm" : "mb-6"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('stayUpdatedDesc')}
            </p>
            
            <div className={isMobile ? "space-y-3" : "space-y-4"}>
              <Button 
                onClick={handleNewsletterClick}
                className={`bg-blue-600 hover:bg-blue-700 text-white border-0 w-full md:w-auto ${isMobile ? "px-6 py-3 text-sm" : "px-6 py-3"} font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {t('subscribeNewsletter')}
              </Button>
              
              {/* Legal Links */}
              <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${isMobile ? "pt-2" : "pt-4"}`}>
                <button className={`text-gray-500 hover:text-gray-700 transition-colors text-left ${isMobile ? "text-sm" : "text-sm"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('privacyPolicy')}
                </button>
                <button className={`text-gray-500 hover:text-gray-700 transition-colors text-left ${isMobile ? "text-sm" : "text-sm"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('termsOfService')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-gray-200 ${isMobile ? "mt-6 pt-4" : "mt-12 pt-8"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-gray-500 text-center md:text-left ${isMobile ? "text-sm" : "text-sm"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              &copy; 2025 Bundleist Ltd. {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
