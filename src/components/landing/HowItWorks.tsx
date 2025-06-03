
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
    <section id="how-it-works" className={`${isMobile ? 'py-16' : 'py-24'} relative overflow-hidden`}>
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center max-w-4xl mx-auto ${isMobile ? 'mb-12' : 'mb-20'} transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-blue-200/50 mb-6">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Simple Process
            </span>
          </div>
          
          <h2 className={`${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'} font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-900 bg-clip-text text-transparent leading-tight`}>
            7 Simple Steps to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Supply Chain Success
            </span>
          </h2>
          
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 leading-relaxed max-w-2xl mx-auto`}>
            Our streamlined process makes sourcing and shipping from Turkey effortless with cutting-edge technology and expert support.
          </p>
        </div>

        {/* Desktop and Tablet View (Modern Cards Grid) */}
        <div className="hidden md:block max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              
              return (
                <div 
                  key={index}
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-blue-200/50 hover:-translate-y-2 cursor-pointer`}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Icon with modern background */}
                  <div className={`relative mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <StepIcon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/5 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View (Vertical Modern Cards) */}
        <div className="md:hidden">
          <div className="space-y-6 max-w-md mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <div 
                  key={index}
                  className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.bgGradient} flex items-center justify-center`}>
                      <StepIcon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
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
    </section>
  );
};

export default HowItWorks;
