
import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, FileText, FileCheck, Ship, Receipt, Users, Wallet } from 'lucide-react';

interface Step {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: FileText,
    title: "Find Your Suppliers",
    description: "Find your suppliers, get your proforma invoices and send them all to our team for review and processing."
  },
  {
    icon: Users,
    title: "Supplier Verification",
    description: "Our team will verify your suppliers and after confirmation we will sign a master contract to act on your behalf."
  },
  {
    icon: Wallet,
    title: "Payment Processing",
    description: "We will handle all your order payments on behalf of you from your account balance with complete transparency."
  },
  {
    icon: Receipt,
    title: "Order Consolidation",
    description: "Our team will receive and verify all your orders, then combine them into a single optimized shipment."
  },
  {
    icon: FileCheck,
    title: "Documentation Simplified",
    description: "We handle all export paperwork, customs forms, and create a single bill of lading for your consolidated shipment."
  },
  {
    icon: Ship,
    title: "Global Shipping",
    description: "Your consolidated order is shipped to your destination with real-time tracking and updates."
  },
  {
    icon: CheckCircle2,
    title: "Easy Delivery",
    description: "Receive your multiple orders as a single shipment, saving time and reducing customs complexity."
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
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block py-1 px-3 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-3">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How GROOP Simplifies Your Supply Chain
          </h2>
          <p className="text-xl text-gray-600">
            Our streamlined process makes sourcing and shipping from Turkey effortless.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2 z-0"></div>
            
            {/* Conversation Steps */}
            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => {
                const [stepVisible, setStepVisible] = useState(false);
                const stepRef = useRef<HTMLDivElement>(null);

                useEffect(() => {
                  const observer = new IntersectionObserver(
                    (entries) => {
                      if (entries[0].isIntersecting) {
                        setStepVisible(true);
                      }
                    },
                    { threshold: 0.1 }
                  );

                  if (stepRef.current) {
                    observer.observe(stepRef.current);
                  }

                  return () => {
                    if (stepRef.current) {
                      observer.unobserve(stepRef.current);
                    }
                  };
                }, []);

                const delay = 100 + (index * 150);
                const isOdd = index % 2 === 1;
                const StepIcon = step.icon;

                return (
                  <div 
                    key={index}
                    ref={stepRef}
                    className={`flex flex-col ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} items-center transition-all duration-700 ease-out ${
                      stepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${delay}ms` }}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* Icon circle */}
                    <div className="flex-shrink-0 relative z-10">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeStep === index ? 'bg-indigo-500 text-white scale-110' : 'bg-white border border-indigo-100 text-indigo-500'
                        }`}
                      >
                        <StepIcon className="h-5 w-5" />
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                          <span className={`text-xs font-bold ${activeStep === index ? 'text-white' : 'text-indigo-500'}`}>
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div 
                      className={`mt-4 md:mt-0 ${isOdd ? 'md:mr-6 md:text-right' : 'md:ml-6'} md:w-5/12`}
                    >
                      <div 
                        className={`p-5 rounded-lg transition-all duration-300 ${
                          activeStep === index 
                            ? 'bg-indigo-50 border border-indigo-100 shadow-md transform -translate-y-1' 
                            : 'bg-white border border-gray-100 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {!isOdd && (
                            <div className="mr-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs text-blue-600">YOU</span>
                              </div>
                            </div>
                          )}
                          <h3 className="font-bold text-lg text-gray-900">{isOdd ? "Our Response:" : "You Ask:"}</h3>
                          {isOdd && (
                            <div className="ml-2">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-xs text-indigo-600">US</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <h4 className="font-semibold text-md">{step.title}</h4>
                          <p className={`mt-1 text-sm ${isOdd ? 'text-indigo-700' : 'text-gray-600'}`}>{step.description}</p>
                        </div>
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
