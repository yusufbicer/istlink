import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Package, CreditCard, Truck, BarChart3 } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const steps = [
    {
      icon: Package,
      title: "1. Order & Upload",
      description: "Upload your supplier invoices and product details. Our system automatically processes and organizes your orders from multiple Turkish suppliers.",
      details: ["Upload invoices in any format", "Automatic data extraction", "Multi-supplier coordination", "Order validation & verification"]
    },
    {
      icon: CreditCard,
      title: "2. Secure Payment",
      description: "Make a single payment to istLinq. We handle all individual supplier payments securely, ensuring complete transparency and protection.",
      details: ["Single consolidated payment", "Secure escrow protection", "Real-time payment tracking", "Automated supplier disbursement"]
    },
    {
      icon: Truck,
      title: "3. Smart Consolidation",
      description: "Our AI optimizes container space and shipping routes, consolidating your orders into cost-effective shipments with maximum efficiency.",
      details: ["AI-powered space optimization", "Route planning & scheduling", "Container loading coordination", "Multi-order consolidation"]
    },
    {
      icon: BarChart3,
      title: "4. Track & Receive",
      description: "Monitor your shipment progress in real-time through our dashboard until delivery, with complete visibility at every step.",
      details: ["Real-time tracking updates", "Complete shipment visibility", "Delivery coordination", "Performance analytics"]
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            How istLinq Works
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">
            Four simple steps to transform your Turkish supply chain operations.
          </p>
        </div>

        {isMobile ? (
          // Mobile: Vertical step-by-step layout
          <div className="space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">{step.description}</p>
                    </div>
                  </div>
                  <div className="ml-13">
                    <ul className="space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-xs text-gray-500 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        ) : isTablet ? (
          // Tablet: 2x2 grid layout
          <div className="grid grid-cols-2 gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-center text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm text-center leading-relaxed mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-xs text-gray-500 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop: Keep existing carousel layout
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  className="p-2 rounded-full border-gray-200 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextStep}
                  className="p-2 rounded-full border-gray-200 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {React.createElement(steps[currentStep].icon, {
                    className: "h-8 w-8 text-blue-600"
                  })}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {steps[currentStep].title}
                </h3>
                
                <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                  {steps[currentStep].description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {steps[currentStep].details.map((detail, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mt-8">
          <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg px-8 py-3">
            <a href="https://cal.com/yusuf-bicer-8ytuyg" target="_blank" rel="noopener noreferrer">
              Get Started Today
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
