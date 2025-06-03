
import React, { useEffect, useRef, useState } from 'react';
import { Package, TruckIcon, UsersIcon, FileTextIcon, CreditCardIcon, GlobeIcon, ShieldCheck } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';
import type { UseEmblaCarouselType } from "embla-carousel-react";

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
  const [activeFeature, setActiveFeature] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [emblaApi, setEmblaApi] = useState<UseEmblaCarouselType[1] | null>(null);

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

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setActiveFeature(emblaApi.selectedScrollSnap());
      };
      
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
    return undefined;
  }, [emblaApi]);

  // Function to navigate to a specific feature
  const scrollToFeature = (index: number) => {
    if (emblaApi && emblaApi.scrollTo) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <section id="features" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Simplifying Cross-Border Procurement
          </h2>
          <p className="text-xl text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Our platform streamlines the entire process of purchasing and shipping products from multiple Turkish suppliers.
          </p>
        </div>

        {/* Desktop Asymmetric Bento Grid Layout */}
        <div className="hidden lg:grid grid-cols-6 gap-4 auto-rows-fr">
          {/* Main featured item (spans 2 columns and 2 rows) */}
          <div 
            className={`${features[0].color} rounded-xl border p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col col-span-2 row-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className={`w-12 h-12 ${features[0].iconColor} rounded-lg flex items-center justify-center mb-4`}>
              {React.createElement(features[0].icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[0].title}</h3>
            <p className="text-gray-600 mb-6 flex-grow" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[0].description}</p>
            <div className="bg-white rounded-lg p-4 mt-auto">
              <div className="text-sm font-medium text-gray-800 mb-3 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Our customers typically save:</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-metallic-blue mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>35%</div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Shipping</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-metallic-blue mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>68%</div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Paperwork</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-metallic-blue mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>92%</div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Space</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second feature - spans 2 columns */}
          <div 
            className={`${features[1].color} rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className={`w-12 h-12 ${features[1].iconColor} rounded-lg flex items-center justify-center mb-4`}>
              {React.createElement(features[1].icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[1].title}</h3>
            <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[1].description}</p>
          </div>

          {/* Third feature - spans 2 columns */}
          <div 
            className={`${features[2].color} rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`w-12 h-12 ${features[2].iconColor} rounded-lg flex items-center justify-center mb-4`}>
              {React.createElement(features[2].icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[2].title}</h3>
            <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[2].description}</p>
          </div>

          {/* Fourth feature - Documentation (spans 2 columns for better alignment) */}
          <div 
            className={`${features[3].color} rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className={`w-12 h-12 ${features[3].iconColor} rounded-lg flex items-center justify-center mb-4`}>
              {React.createElement(features[3].icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[3].title}</h3>
            <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[3].description}</p>
          </div>

          {/* Fifth feature - Global Compliance (spans 2 columns for better alignment) */}
          <div 
            className={`${features[4].color} rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`w-12 h-12 ${features[4].iconColor} rounded-lg flex items-center justify-center mb-4`}>
              {React.createElement(features[4].icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[4].title}</h3>
            <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[4].description}</p>
          </div>

          {/* Sixth feature - spans 2 columns */}
          <div 
            className={`${features[5].color} rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className={`w-12 h-12 ${features[5].iconColor} rounded-lg flex items-center justify-center mb-4`}>
              {React.createElement(features[5].icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[5].title}</h3>
            <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[5].description}</p>
          </div>

          {/* Seventh feature - spans 2 columns */}
          <div 
            className={`${features[6].color} rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className={`w-12 h-12 ${features[6].iconColor} rounded-lg flex items-center justify-center mb-4`}>
              {React.createElement(features[6].icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[6].title}</h3>
            <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[6].description}</p>
          </div>
        </div>

        {/* Improved Tablet Layout with better spacing */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-6 gap-4">
            {/* Row 1: Featured item (3 cols) + Single Bill (3 cols) */}
            <div 
              className={`${features[0].color} rounded-xl border p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col col-span-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className={`w-12 h-12 ${features[0].iconColor} rounded-lg flex items-center justify-center mb-4`}>
                {React.createElement(features[0].icon, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[0].title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[0].description}</p>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs font-medium text-gray-800 mb-2 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Customers save:</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-sm font-bold text-metallic-blue" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>35%</div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Shipping</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-metallic-blue" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>68%</div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Paperwork</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-metallic-blue" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>92%</div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Space</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className={`${features[1].color} rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className={`w-10 h-10 ${features[1].iconColor} rounded-lg flex items-center justify-center mb-3`}>
                {React.createElement(features[1].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[1].title}</h3>
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[1].description}</p>
            </div>

            {/* Row 2: Centralized Payments (2 cols) + Documentation (2 cols) + Compliance (2 cols) */}
            <div 
              className={`${features[2].color} rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className={`w-10 h-10 ${features[2].iconColor} rounded-lg flex items-center justify-center mb-3`}>
                {React.createElement(features[2].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[2].title}</h3>
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[2].description}</p>
            </div>

            <div 
              className={`${features[3].color} rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className={`w-10 h-10 ${features[3].iconColor} rounded-lg flex items-center justify-center mb-3`}>
                {React.createElement(features[3].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[3].title}</h3>
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[3].description}</p>
            </div>

            <div 
              className={`${features[4].color} rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className={`w-10 h-10 ${features[4].iconColor} rounded-lg flex items-center justify-center mb-3`}>
                {React.createElement(features[4].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[4].title}</h3>
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[4].description}</p>
            </div>

            {/* Row 3: Supplier Management (3 cols) + Quality Assurance (3 cols) */}
            <div 
              className={`${features[5].color} rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className={`w-10 h-10 ${features[5].iconColor} rounded-lg flex items-center justify-center mb-3`}>
                {React.createElement(features[5].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[5].title}</h3>
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[5].description}</p>
            </div>

            <div 
              className={`${features[6].color} rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 col-span-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div className={`w-10 h-10 ${features[6].iconColor} rounded-lg flex items-center justify-center mb-3`}>
                {React.createElement(features[6].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[6].title}</h3>
              <p className="text-gray-600 text-xs" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{features[6].description}</p>
            </div>
          </div>
        </div>

        {/* Improved Mobile Feature Spotlight Carousel */}
        <div className="md:hidden">
          {/* Feature Quick Nav - NEW */}
          <div className="mb-4 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2 pb-2">
              {features.map((feature, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToFeature(idx)}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeFeature === idx 
                      ? 'bg-metallic-blue text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          <Carousel
            className="w-full"
            setApi={setEmblaApi}
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index}>
                  <div className={`h-full ${feature.color} rounded-xl border p-6 shadow-sm flex flex-col ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className={`w-16 h-16 ${feature.iconColor} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                      {React.createElement(feature.icon, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.title}</h3>
                    <p className="text-gray-600 text-center mb-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.description}</p>
                    
                    {index === 0 && (
                      <div className="bg-white rounded-lg p-3 mt-auto">
                        <div className="text-xs font-medium text-gray-800 text-center mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Customers typically save:</div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-center">
                            <div className="text-base font-bold text-metallic-blue" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>35%</div>
                            <div className="text-[10px] text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Shipping</div>
                          </div>
                          <div className="text-center">
                            <div className="text-base font-bold text-metallic-blue" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>68%</div>
                            <div className="text-[10px] text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Paperwork</div>
                          </div>
                          <div className="text-center">
                            <div className="text-base font-bold text-metallic-blue" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>92%</div>
                            <div className="text-[10px] text-gray-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Space</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-10 left-0 right-0">
              <div className="flex justify-center items-center gap-4 mt-4">
                <CarouselPrevious className="static translate-y-0 h-8 w-8" />
                <div className="flex space-x-1 items-center">
                  {features.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToFeature(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeFeature === idx ? 'w-6 bg-metallic-blue' : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to feature ${idx + 1}`}
                    />
                  ))}
                </div>
                <CarouselNext className="static translate-y-0 h-8 w-8" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      {/* Replace style jsx with a style element or move to CSS */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};

export default Features;
