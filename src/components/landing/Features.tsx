
import { useEffect, useRef, useState } from 'react';
import { Package, TruckIcon, UsersIcon, FileTextIcon, CreditCardIcon, GlobeIcon, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: "Consolidated Shipping",
    description: "Combine multiple purchases from various suppliers into a single shipment, saving on shipping costs and paperwork.",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600 bg-blue-100"
  },
  {
    icon: TruckIcon,
    title: "Single Bill of Lading",
    description: "We handle the export declaration and create a single bill of lading for all your shipments from Turkey.",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600 bg-green-100"
  },
  {
    icon: CreditCardIcon,
    title: "Centralized Payments",
    description: "Make a single payment to us instead of multiple international transfers to different suppliers.",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600 bg-purple-100"
  },
  {
    icon: FileTextIcon,
    title: "Simplified Documentation",
    description: "We handle all the complex documentation required for international shipping and customs clearance.",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600 bg-amber-100"
  },
  {
    icon: GlobeIcon,
    title: "Global Compliance",
    description: "Our platform ensures that all shipments comply with international trade regulations and requirements.",
    color: "bg-cyan-50 border-cyan-200",
    iconColor: "text-cyan-600 bg-cyan-100"
  },
  {
    icon: UsersIcon,
    title: "Supplier Management",
    description: "Easily manage all your Turkish suppliers in one place, streamlining your procurement process.",
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600 bg-pink-100"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Our team conducts pre-shipment inspections to ensure all products meet your quality standards.",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600 bg-indigo-100"
  }
];

const Features = () => {
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

  // Create a component reference for the first feature's icon
  const MainFeatureIcon = features[0].icon;

  return (
    <section id="features" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simplifying Cross-Border Procurement
          </h2>
          <p className="text-xl text-gray-600">
            Our platform streamlines the entire process of purchasing and shipping products from multiple Turkish suppliers.
          </p>
        </div>

        {/* Desktop Bento Grid Layout */}
        <div className="hidden md:grid grid-cols-3 gap-4 auto-rows-fr">
          {/* Main featured item (spans 2 columns and rows) */}
          <div 
            className={`${features[0].color} col-span-2 row-span-2 rounded-xl border p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className={`w-16 h-16 ${features[0].iconColor} rounded-xl flex items-center justify-center mb-6`}>
              <MainFeatureIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">{features[0].title}</h3>
            <p className="text-gray-600 text-lg mb-4">{features[0].description}</p>
            <div className="bg-white rounded-lg p-4 mt-auto">
              <div className="text-sm font-medium text-gray-800">Our customers typically save:</div>
              <div className="flex justify-between mt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-metallic-blue">35%</div>
                  <div className="text-xs text-gray-500">Shipping Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-metallic-blue">68%</div>
                  <div className="text-xs text-gray-500">Paperwork Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-metallic-blue">92%</div>
                  <div className="text-xs text-gray-500">Space Utilization</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Regular feature items */}
          {features.slice(1).map((feature, index) => {
            // Create a component reference for each feature icon
            const FeatureIcon = feature.icon;
            
            return (
              <div 
                key={index} 
                className={`${feature.color} rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 1) * 100 + 100}ms` }}
              >
                <div className={`w-12 h-12 ${feature.iconColor} rounded-lg flex items-center justify-center mb-4`}>
                  <FeatureIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile Optimized Layout - Swipe Cards */}
        <div className="md:hidden">
          <div className="pb-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory flex gap-4 -mx-6 px-6">
            {features.map((feature, index) => {
              // Create a component reference for each feature icon in mobile view
              const FeatureIcon = feature.icon;
              
              return (
                <div 
                  key={index} 
                  className={`${feature.color} flex-shrink-0 w-[85%] snap-center rounded-xl border p-5 shadow-sm transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 ${feature.iconColor} rounded-lg flex items-center justify-center mb-4`}>
                    <FeatureIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 space-x-1">
            {features.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 rounded-full ${index === 0 ? 'w-4 bg-metallic-blue' : 'w-2 bg-gray-300'}`}
              ></div>
            ))}
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            Swipe to see more features
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Features;
