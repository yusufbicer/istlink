
import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, PackagePlus, GitMerge, Ship, FileCheck, Users } from 'lucide-react';

interface Step {
  icon: any;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Users,
    title: "Connect with Suppliers",
    description: "Easily link your existing Turkish suppliers to our platform, or discover new ones from our verified network."
  },
  {
    icon: PackagePlus,
    title: "Make Your Purchases",
    description: "Buy products from multiple suppliers through our platform or simply enter your order details for tracking."
  },
  {
    icon: GitMerge,
    title: "Consolidation Happens",
    description: "Our team in Turkey receives and verifies all items, then combines them into a single optimized shipment."
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
    <section id="how-it-works" className="py-20 bg-gray-100">
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
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-100 transform -translate-x-1/2 z-0"></div>
            
            {/* Steps */}
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

                return (
                  <div 
                    key={index}
                    ref={stepRef}
                    className={`flex flex-col ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} items-center transition-all duration-700 ease-out ${
                      stepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    {/* Icon with number */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-white border border-indigo-100 flex items-center justify-center shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-indigo-600" />
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`mt-4 md:mt-0 ${isOdd ? 'md:mr-6 md:text-right' : 'md:ml-6'} md:w-5/12`}>
                      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
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
