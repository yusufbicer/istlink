
import { useEffect, useRef, useState } from 'react';
import { Package, TruckIcon, UsersIcon, FileTextIcon, CreditCardIcon, GlobeIcon } from 'lucide-react';

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const delay = 100 + (index * 100);

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl p-6 transition-all duration-700 ease-out border border-gray-100 shadow-sm hover:shadow-md ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

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

  const features = [
    {
      icon: Package,
      title: "Consolidated Shipping",
      description: "Combine multiple purchases from various suppliers into a single shipment, saving on shipping costs and paperwork."
    },
    {
      icon: TruckIcon,
      title: "Single Bill of Lading",
      description: "We handle the export declaration and create a single bill of lading for all your shipments from Turkey."
    },
    {
      icon: CreditCardIcon,
      title: "Centralized Payments",
      description: "Make a single payment to us instead of multiple international transfers to different suppliers."
    },
    {
      icon: FileTextIcon,
      title: "Simplified Documentation",
      description: "We handle all the complex documentation required for international shipping and customs clearance."
    },
    {
      icon: GlobeIcon,
      title: "Global Compliance",
      description: "Our platform ensures that all shipments comply with international trade regulations and requirements."
    },
    {
      icon: UsersIcon,
      title: "Supplier Management",
      description: "Easily manage all your Turkish suppliers in one place, streamlining your procurement process."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
