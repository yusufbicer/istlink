
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
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Find Your Suppliers",
    description: "Find your suppliers, get your proforma invoices and send them all to our team for review and processing.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "Supplier Verification",
    description: "Our team will verify your suppliers and after confirmation we will sign a master contract to act on your behalf.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "We will handle all your order payments on behalf of you from your account balance with complete transparency.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: PackagePlus,
    title: "Order Consolidation",
    description: "Our team will receive and verify all your orders, then combine them into a single optimized shipment.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: ClipboardCheck,
    title: "Documentation Simplified",
    description: "We handle all export paperwork, customs forms, and create a single bill of lading for your consolidated shipment.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: ShipIcon,
    title: "Global Shipping",
    description: "Your consolidated order is shipped to your destination with real-time tracking and updates.",
    color: "bg-cyan-100 text-cyan-600"
  },
  {
    icon: MapPin,
    title: "Easy Delivery",
    description: "Receive your multiple orders as a single shipment, saving time and reducing customs complexity.",
    color: "bg-pink-100 text-pink-600"
  }
];

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
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
    <section id="how-it-works" className={`${isMobile ? 'py-12' : 'py-20'} bg-gradient-to-b from-gray-50 to-gray-100`}>
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto ${isMobile ? 'mb-8' : 'mb-16'} transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block py-1 px-3 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Simple Process
          </span>
          <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-3xl md:text-4xl'} font-semibold mb-4`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            7 Simple Steps to Supply Chain Success
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Our streamlined process makes sourcing and shipping from Turkey effortless.
          </p>
        </div>

        {/* Desktop and Tablet View (Timeline) */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-200 transform -translate-x-1/2 z-0"></div>
            
            {/* Steps */}
            <div className="space-y-16 relative z-10">
              {steps.map((step, index) => {
                const isOdd = index % 2 === 1;
                const StepIcon = step.icon;

                return (
                  <div 
                    key={index}
                    className={`flex ${isOdd ? 'flex-row-reverse' : 'flex-row'} items-center`}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* Icon circle */}
                    <div className="flex-shrink-0 relative z-10">
                      <div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                          activeStep === index ? 'border-emerald-500 scale-110' : 'border-white'
                        } ${step.color}`}
                      >
                        <StepIcon className="h-7 w-7" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div 
                      className={`${isOdd ? 'mr-8 text-right' : 'ml-8'} w-5/12`}
                    >
                      <div 
                        className={`p-5 rounded-lg transition-all duration-300 ${
                          activeStep === index 
                            ? 'bg-white shadow-xl transform -translate-y-1 border-l-4 border-emerald-500' 
                            : 'bg-white shadow-md'
                        }`}
                      >
                        <h3 className="font-semibold text-xl text-gray-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{step.title}</h3>
                        <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View (Vertical Steps) */}
        <div className="md:hidden">
          <div className="relative max-w-md mx-auto">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-indigo-200 z-0"></div>
            
            {/* Steps */}
            <div className="space-y-6 relative z-10">
              {steps.map((step, index) => {
                const StepIcon = step.icon;

                return (
                  <div 
                    key={index}
                    className="flex items-start"
                  >
                    {/* Icon circle */}
                    <div className="flex-shrink-0 relative z-10">
                      <div 
                        className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} rounded-full flex items-center justify-center border-4 border-white ${step.color}`}
                      >
                        <StepIcon className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                      </div>
                      <div className={`absolute -top-1 -right-1 ${isMobile ? 'w-6 h-6' : 'w-7 h-7'} rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="ml-4 flex-1">
                      <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-emerald-500">
                        <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-900 mb-2`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{step.title}</h3>
                        <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-base'}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
