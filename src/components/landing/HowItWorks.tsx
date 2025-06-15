
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
      title: "Find Your Suppliers",
      description: "Find your suppliers, get your proforma invoices and send them all to our team for review and processing.",
      color: "text-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: ShieldCheck,
      title: "Supplier Verification",
      description: "Our team will verify your suppliers and after confirmation we will sign a master contract to act on your behalf.",
      color: "text-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "We will handle all your order payments on behalf of you from your account balance with complete transparency.",
      color: "text-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: PackagePlus,
      title: "Order Consolidation",
      description: "Our team will receive and verify all your orders, then combine them into a single optimized shipment.",
      color: "text-amber-600",
      bgGradient: "from-amber-50 to-amber-100"
    },
    {
      icon: ClipboardCheck,
      title: "Documentation Simplified",
      description: "We handle all export paperwork, customs forms, and create a single bill of lading for your consolidated shipment.",
      color: "text-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100"
    },
    {
      icon: ShipIcon,
      title: "Global Shipping",
      description: "Your consolidated order is shipped to your destination with real-time tracking and updates.",
      color: "text-cyan-600",
      bgGradient: "from-cyan-50 to-cyan-100"
    },
    {
      icon: MapPin,
      title: "Easy Delivery",
      description: "Receive your multiple orders as a single shipment, saving time and reducing customs complexity.",
      color: "text-pink-600",
      bgGradient: "from-pink-50 to-pink-100"
    }
  ];


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
    <section id="how-it-works" className={`${isMobile ? 'py-2' : 'py-20'} relative overflow-hidden bg-gray-50`} key={`how-it-works-${i18n.language}`}>
      {/* Subtle background elements for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 via-transparent to-indigo-600/3"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-100/30 to-blue-100/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center max-w-4xl mx-auto ${isMobile ? 'mb-2' : 'mb-10'} transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-700 ${isMobile ? 'mb-2' : 'mb-6'} shadow-sm`}>
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('simpleProcess')}
            </span>
          </div>
          
          <h2 className={`${isMobile ? 'text-xl mb-2' : 'text-3xl md:text-4xl mb-6'} font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('howItWorks')}
          </h2>
          
          <p className={`text-slate-600 ${isMobile ? 'text-sm' : 'text-lg'} max-w-3xl mx-auto leading-relaxed`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('howItWorksDesc')}
          </p>
        </div>

        {/* Timeline Design */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline - More Compact */}
          <div className="hidden md:block relative">
            {/* Timeline Container with Visual Boundaries */}
            <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 shadow-lg">
              {/* Start Indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">{t('start')}</span>
                </div>
              </div>
              
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 via-emerald-200 to-blue-200 h-full rounded-full top-8 bottom-8"></div>
              
              {/* End Indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
                <div className="w-12 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">{t('done')}</span>
                </div>
              </div>
            
              <div className="space-y-4 relative z-10">
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
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-blue-200 group hover:-translate-y-2">
                          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            {step.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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

          {/* Mobile Timeline - Compact */}
          <div className="md:hidden">
            {/* Mobile Timeline Container */}
            <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-lg">
              {/* Mobile Start Indicator */}
              <div className="absolute top-0 left-3 transform -translate-y-2">
                <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-[10px] font-bold">{t('start')}</span>
                </div>
              </div>
              
              <div className="relative pl-6">
                {/* Mobile Timeline Line */}
                <div className="absolute left-3 top-4 w-0.5 bg-gradient-to-b from-blue-200 via-emerald-200 to-blue-200 h-full rounded-full bottom-4"></div>
                
                {/* Mobile End Indicator */}
                <div className="absolute bottom-0 left-3 transform translate-y-2">
                  <div className="w-8 h-6 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-[10px] font-bold">{t('done')}</span>
                  </div>
                </div>
                
                <div className="space-y-1 relative z-10 pt-4 pb-4">
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
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-slate-200/50 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
                            <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              {step.title}
                            </h3>
                            <p className="text-slate-600 text-xs leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
      </div>
    </section>
  );
};

export default HowItWorks;
