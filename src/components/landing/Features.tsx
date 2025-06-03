
import React from 'react';
import { Shield, Clock, DollarSign, BarChart3, Users, Truck } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const Features = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const features = [
    {
      icon: Shield,
      title: "Secure Payment Handling",
      description: "Manage all supplier payments through our secure platform with full transaction transparency and protection."
    },
    {
      icon: Clock,
      title: "Save 60+ Hours Monthly",
      description: "Automate complex documentation and consolidation processes that typically consume weeks of manual work."
    },
    {
      icon: DollarSign,
      title: "Reduce Shipping Costs by 40%",
      description: "Optimize container space utilization and leverage bulk shipping rates for significant cost savings."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track shipment progress, costs, and efficiency metrics with comprehensive dashboard insights."
    },
    {
      icon: Users,
      title: "Supplier Network Management",
      description: "Streamline relationships with multiple Turkish suppliers through centralized communication and ordering."
    },
    {
      icon: Truck,
      title: "End-to-End Logistics",
      description: "From Turkish warehouses to your destination - complete visibility and control over your supply chain."
    }
  ];

  return (
    <section id="features" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Why Choose istLinq?
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">
            Transform your Turkish supply chain operations with our comprehensive consolidation platform.
          </p>
        </div>
        
        {isMobile ? (
          <div className="space-y-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : isTablet ? (
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-center text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-2 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
