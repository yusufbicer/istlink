
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

interface Step {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  bgGradient: string;
}

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

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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
  }, []);

  return (
    <section id="how-it-works" className={`${isMobile ? 'py-8' : 'py-10'} relative overflow-hidden`}>
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center max-w-4xl mx-auto ${isMobile ? 'mb-8' : 'mb-10'} transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-blue-200/50 mb-3 md:mb-4">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Simple Process
            </span>
          </div>
          
          <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-900 bg-clip-text text-transparent leading-tight`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            7 Simple Steps to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Supply Chain Success
            </span>
          </h2>
          
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 leading-relaxed max-w-2xl mx-auto`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Our streamlined process makes sourcing and shipping from Turkey effortless with cutting-edge technology and expert support.
          </p>
        </div>

        {/* Timeline Design */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline - More Compact */}
          <div className="hidden md:block relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 via-emerald-200 to-blue-200 h-full rounded-full"></div>
            
            <div className="space-y-6">
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

          {/* Mobile Timeline - More Compact */}
          <div className="md:hidden">
            <div className="relative pl-8">
              {/* Mobile Timeline Line */}
              <div className="absolute left-4 top-0 w-1 bg-gradient-to-b from-blue-200 via-emerald-200 to-blue-200 h-full rounded-full"></div>
              
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isVisible = visibleSteps.includes(index);
                  
                  return (
                    <div key={index} className="relative">
                      {/* Mobile Timeline Node */}
                      <div className={`absolute -left-4 w-8 h-8 rounded-full bg-white border-4 border-gradient-to-r from-blue-200 to-emerald-200 shadow-lg flex items-center justify-center transition-all duration-500 ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}>
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${step.bgGradient} flex items-center justify-center`}>
                          <StepIcon className={`h-2.5 w-2.5 ${step.color}`} />
                        </div>
                      </div>
                      
                      {/* Mobile Step Number */}
                      <div className={`absolute -left-6 -top-2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-lg transition-all duration-500 delay-200 ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* Mobile Content */}
                      <div className={`ml-4 transition-all duration-700 delay-300 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                      }`}>
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                          <h3 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
