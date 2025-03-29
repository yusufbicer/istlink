
import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  CreditCard, 
  PackagePlus, 
  ClipboardCheck, 
  ShipIcon, 
  MapPin,
  Zap
} from 'lucide-react';

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
    color: "bg-neon-blue/20 text-neon-blue"
  },
  {
    icon: ShieldCheck,
    title: "Supplier Verification",
    description: "Our team will verify your suppliers and after confirmation we will sign a master contract to act on your behalf.",
    color: "bg-neon-purple/20 text-neon-purple"
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "We will handle all your order payments on behalf of you from your account balance with complete transparency.",
    color: "bg-neon-pink/20 text-neon-pink"
  },
  {
    icon: PackagePlus,
    title: "Order Consolidation",
    description: "Our team will receive and verify all your orders, then combine them into a single optimized shipment.",
    color: "bg-neon-green/20 text-neon-green"
  },
  {
    icon: ClipboardCheck,
    title: "Documentation Simplified",
    description: "We handle all export paperwork, customs forms, and create a single bill of lading for your consolidated shipment.",
    color: "bg-neon-cyan/20 text-neon-cyan"
  },
  {
    icon: ShipIcon,
    title: "Global Shipping",
    description: "Your consolidated order is shipped to your destination with real-time tracking and updates.",
    color: "bg-neon-blue/20 text-neon-blue"
  },
  {
    icon: MapPin,
    title: "Easy Delivery",
    description: "Receive your multiple orders as a single shipment, saving time and reducing customs complexity.",
    color: "bg-neon-purple/20 text-neon-purple"
  }
];

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
    <section 
      id="how-it-works" 
      className="py-20 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden"
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      
      {/* Glowing orbs for futuristic effect */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-neon-purple/20 filter blur-3xl animate-glow-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-neon-blue/20 filter blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block py-1 px-3 text-sm font-medium bg-neon-purple/10 text-neon-purple rounded-full mb-3 border border-neon-purple/30 font-future">
            PROCESS PROTOCOL
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow font-future">
            7 <span className="cyber-text">Synaptic Steps</span> to Supply Chain Success
          </h2>
          <p className="text-xl text-foreground/80">
            Our streamlined process makes sourcing and shipping from Turkey effortless.
          </p>
        </div>

        {/* Desktop View (Timeline) */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-neon-purple/30 transform -translate-x-1/2 z-0 shadow-neon-purple"></div>
            
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
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                          activeStep === index ? 'border-neon-purple scale-110 shadow-neon-purple' : 'border-neon-purple/50'
                        } ${step.color} backdrop-blur-sm`}
                      >
                        <StepIcon className="h-7 w-7" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center text-white font-bold text-sm border border-white/20 shadow-neon-purple">
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
                            ? 'neo-glass shadow-neon-purple transform -translate-y-1 border-l-4 border-neon-purple' 
                            : 'bg-secondary/50 backdrop-blur-sm border border-neon-purple/20'
                        }`}
                      >
                        <h3 className="font-bold text-xl text-foreground mb-2 font-future flex items-center">
                          {!isOdd && <Zap size={16} className="mr-2 text-neon-purple" />}
                          {step.title}
                          {isOdd && <Zap size={16} className="ml-2 text-neon-purple" />}
                        </h3>
                        <p className="text-foreground/80">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View (Cards) */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            
            return (
              <div 
                key={index} 
                className="neo-glass rounded-lg overflow-hidden border-l-4 border-neon-purple"
              >
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${step.color} border border-white/10`}>
                      <StepIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-neon-purple text-white flex items-center justify-center text-sm font-bold mr-2 shadow-neon-purple">
                          {index + 1}
                        </span>
                        <h3 className="font-bold text-lg text-foreground font-future">{step.title}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 pl-16">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
