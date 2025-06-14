
import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  CreditCard, 
  PackagePlus, 
  ClipboardCheck, 
  ShipIcon, 
  MapPin
} from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

interface Step {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  bgGradient: string;
}


const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { t, i18n } = useTranslation();

  const steps: Step[] = [
    {
      icon: Search,
      title: t('findSuppliers'),
      description: t('findSuppliersDesc'),
      color: "text-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: ShieldCheck,
      title: t('supplierVerification'),
      description: t('supplierVerificationDesc'),
      color: "text-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    {
      icon: CreditCard,
      title: t('paymentProcessing'),
      description: t('paymentProcessingDesc'),
      color: "text-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: PackagePlus,
      title: t('orderConsolidation'),
      description: t('orderConsolidationDesc'),
      color: "text-amber-600",
      bgGradient: "from-amber-50 to-amber-100"
    },
    {
      icon: ClipboardCheck,
      title: t('documentationSimplified'),
      description: t('documentationSimplifiedDesc'),
      color: "text-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100"
    },
    {
      icon: ShipIcon,
      title: t('globalShipping'),
      description: t('globalShippingDesc'),
      color: "text-cyan-600",
      bgGradient: "from-cyan-50 to-cyan-100"
    },
    {
      icon: MapPin,
      title: t('easyDelivery'),
      description: t('easyDeliveryDesc'),
      color: "text-pink-600",
      bgGradient: "from-pink-50 to-pink-100"
    }
  ];

  useEffect(() => {
    console.log('HowItWorks Description:', t('howItWorksDesc'), 'Current language:', i18n.language);
  }, [t, i18n.language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Animate steps appearing one by one
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, [steps]);

  return (
    <section id="how-it-works" className={`${isMobile ? 'py-2' : 'py-10'} relative overflow-hidden`} key={`how-it-works-${i18n.language}`}>
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center max-w-4xl mx-auto ${isMobile ? 'mb-2' : 'mb-10'} transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-blue-200/50 ${isMobile ? 'mb-2' : 'mb-3 md:mb-4'}`}>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('simpleProcess')}
            </span>
          </div>
          
          <h2 className={`${isMobile ? 'text-xl mb-2' : 'text-2xl md:text-3xl mb-4'} font-bold text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('howItWorks')}
          </h2>
          
          <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('howItWorksDesc')}
          </p>
        </div>

        {/* Timeline Design */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline - More Compact */}
          <div className="hidden md:block relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 via-emerald-200 to-blue-200 h-full rounded-full"></div>
            
            <div className="space-y-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isLeft = index % 2 === 0;
                const isVisible = visibleSteps.includes(index);
                
                return (
                  <div 
                    key={index}
                    className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Timeline Node */}
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-gradient-to-r from-blue-200 to-emerald-200 shadow-lg flex items-center justify-center z-10 transition-all duration-500 ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br ${step.bgGradient} flex items-center justify-center`}>
                        <StepIcon className={`h-3 w-3 md:h-3.5 md:w-3.5 ${step.color}`} />
                      </div>
                    </div>
                    
                    {/* Step Number */}
                    <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-8 w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-lg transition-all duration-500 delay-200 ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Content Card */}
                    <div 
                      className={`${isLeft ? 'mr-8 pr-10' : 'ml-8 pl-10'} w-1/2 transition-all duration-700 delay-300 ${
                        isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-8' : 'translate-x-8'}`
                      }`}
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group hover:-translate-y-1">
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline - Compact */}
          <div className="md:hidden">
            <div className="relative pl-6">
              {/* Mobile Timeline Line */}
              <div className="absolute left-3 top-0 w-0.5 bg-gradient-to-b from-blue-200 via-emerald-200 to-blue-200 h-full rounded-full"></div>
              
              <div className="space-y-1">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isVisible = visibleSteps.includes(index);
                  
                  return (
                    <div key={index} className="relative">
                      {/* Mobile Timeline Node */}
                      <div className={`absolute -left-3 w-6 h-6 rounded-full bg-white border-2 border-blue-200 shadow-md flex items-center justify-center transition-all duration-500 ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${step.bgGradient} flex items-center justify-center`}>
                          <StepIcon className={`h-1.5 w-1.5 ${step.color}`} />
                        </div>
                      </div>
                      
                      {/* Mobile Step Number */}
                      <div className={`absolute -left-4 -top-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md transition-all duration-500 delay-200 ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* Mobile Content */}
                      <div className={`ml-3 transition-all duration-700 delay-300 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                      }`}>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2.5 shadow-md border border-white/50">
                          <h3 className="text-sm font-bold text-gray-900 mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
