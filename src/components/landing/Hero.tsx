import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleGetStarted = () => {
    navigate('/early-access');
  };

  const handleWatchDemo = () => {
    // Placeholder for demo functionality
    console.log('Watch demo clicked');
  };

  return (
    <section className={`relative ${isMobile ? "pt-16 pb-8" : "pt-20 pb-16"} bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-1 lg:grid-cols-2 gap-12 items-center"}`}>
          
          {/* Left Content */}
          <div className={`${isMobile ? "text-center" : "text-left lg:pr-8"}`}>
            <div className={`inline-flex items-center ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} bg-blue-100 text-blue-800 rounded-full font-medium mb-4`}>
              <span className="mr-2">🚀</span>
              {t('smartExportConsolidation')}
            </div>
            
            <h1 className={`${isMobile ? "text-3xl" : "text-4xl lg:text-5xl xl:text-6xl"} font-bold text-gray-900 ${isMobile ? "mb-4" : "mb-6"} leading-tight`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('heroTitle')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t('turkishSupplyChainComplexity')}
              </span>
              <span className="text-teal-600">Simplified.</span>
            </h1>
            
            <p className={`${isMobile ? "text-base mb-6" : "text-lg lg:text-xl text-gray-600 mb-8"} leading-relaxed max-w-2xl`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('heroSubtitle')}
            </p>
            
            <div className={`flex ${isMobile ? "flex-col gap-3" : "flex-col sm:flex-row gap-4"} ${isMobile ? "" : "items-center"}`}>
              <Button 
                onClick={handleGetStarted}
                size={isMobile ? "default" : "lg"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {t('heroButton')}
                <ArrowRight className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} ml-2`} />
              </Button>
              
              <Button 
                onClick={handleWatchDemo}
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                <Play className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} mr-2`} />
                {t('heroSecondaryButton')}
              </Button>
            </div>
            
            {/* Trust indicators */}
            {!isMobile && (
              <div className="mt-8 flex items-center text-sm text-gray-500">
                <div className="flex items-center mr-6">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {t('trustedByBusinesses')}
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {t('securePayments')}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Content - Dashboard Image */}
          <div className={`${isMobile ? "mt-6" : "mt-0"} relative`}>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {t('dashboardPreview')}
                </div>
                <div className="w-6"></div>
              </div>
              
              {/* Dashboard image */}
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&crop=center"
                  alt={t('dashboardImageAlt')}
                  className="w-full h-auto object-cover"
                />
                {/* Overlay with dashboard elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="text-xs font-semibold text-gray-800 mb-1">
                        {t('activeConsolidations')}
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        {t('consolidationCount')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
              <span className="text-sm font-bold">65%</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg">
              <span className="text-sm font-bold">15x</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
