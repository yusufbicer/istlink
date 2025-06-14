import React, { useEffect, useRef, useState } from 'react';
import { Package, TruckIcon, UsersIcon, FileTextIcon, CreditCardIcon, GlobeIcon, ShieldCheck } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { useTranslation } from 'react-i18next';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [emblaApi, setEmblaApi] = useState<UseEmblaCarouselType[1] | null>(null);
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: Package,
      title: t('consolidatedShipping'),
      description: t('consolidatedShippingDesc'),
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600 bg-blue-100"
    },
    {
      icon: TruckIcon,
      title: t('singleBillOfLadingTitle'),
      description: t('singleBillOfLadingDesc'),
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600 bg-green-100"
    },
    {
      icon: CreditCardIcon,
      title: t('centralizedPayments'),
      description: t('centralizedPaymentsDesc'),
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600 bg-purple-100"
    },
    {
      icon: FileTextIcon,
      title: t('simplifiedDocumentation'),
      description: t('simplifiedDocumentationDesc'),
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600 bg-amber-100"
    },
    {
      icon: GlobeIcon,
      title: t('globalCompliance'),
      description: t('globalComplianceDesc'),
      color: "bg-cyan-50 border-cyan-200",
      iconColor: "text-cyan-600 bg-cyan-100"
    },
    {
      icon: UsersIcon,
      title: t('supplierManagement'),
      description: t('supplierManagementDesc'),
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600 bg-pink-100"
    },
    {
      icon: ShieldCheck,
      title: t('deliveryGuarantee'),
      description: t('deliveryGuaranteeDesc'),
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600 bg-indigo-100"
    }
  ];

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

  const scrollToFeature = (index: number) => {
    if (emblaApi && emblaApi.scrollTo) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <section id="features" className={`${isMobile ? "py-6" : "py-12 md:py-16"} bg-gray-50`} key={`features-${i18n.language}`}>
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto ${isMobile ? "mb-4" : "mb-8 md:mb-10"} transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('features')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('importConsolidation')}
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {t('importConsolidationDesc')}
          </p>
        </div>

        {/* Mobile: Keep original simple grid */}
        <div className={`${isMobile ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 gap-3 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`${feature.color} rounded-lg border p-3 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-8 h-8 mb-2 flex items-center justify-center rounded-lg">
                  <div className={`w-8 h-8 ${feature.iconColor} rounded-lg flex items-center justify-center`}>
                    {React.createElement(feature.icon, { className: "w-4 h-4" })}
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.title}</h3>
                <p className="text-gray-600 text-xs" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop & Tablet: Masonry/Pinterest Style Layout */}
        <div className={`${isMobile ? 'hidden' : 'block'} max-w-6xl mx-auto`}>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {features.map((feature, index) => {
              // Different card styles and layouts for visual variety
              const cardVariants = [
                { 
                  padding: 'p-6', 
                  iconSize: 'w-14 h-14', 
                  textSize: 'text-xl', 
                  iconPos: 'flex-col',
                  rounded: 'rounded-2xl',
                  shadow: 'shadow-lg hover:shadow-xl',
                  transform: 'hover:scale-105'
                },
                { 
                  padding: 'p-5', 
                  iconSize: 'w-10 h-10', 
                  textSize: 'text-lg', 
                  iconPos: 'flex-row items-start',
                  rounded: 'rounded-xl',
                  shadow: 'shadow-md hover:shadow-lg',
                  transform: 'hover:-translate-y-2'
                },
                { 
                  padding: 'p-8', 
                  iconSize: 'w-16 h-16', 
                  textSize: 'text-2xl', 
                  iconPos: 'flex-col',
                  rounded: 'rounded-3xl',
                  shadow: 'shadow-xl hover:shadow-2xl',
                  transform: 'hover:scale-110'
                },
                { 
                  padding: 'p-4', 
                  iconSize: 'w-12 h-12', 
                  textSize: 'text-base', 
                  iconPos: 'flex-row items-center',
                  rounded: 'rounded-lg',
                  shadow: 'shadow-sm hover:shadow-md',
                  transform: 'hover:-translate-y-1'
                },
                { 
                  padding: 'p-7', 
                  iconSize: 'w-13 h-13', 
                  textSize: 'text-lg', 
                  iconPos: 'flex-col',
                  rounded: 'rounded-2xl',
                  shadow: 'shadow-lg hover:shadow-xl',
                  transform: 'hover:rotate-1 hover:scale-105'
                },
                { 
                  padding: 'p-5', 
                  iconSize: 'w-11 h-11', 
                  textSize: 'text-lg', 
                  iconPos: 'flex-row items-start',
                  rounded: 'rounded-xl',
                  shadow: 'shadow-md hover:shadow-lg',
                  transform: 'hover:-translate-y-3'
                },
                { 
                  padding: 'p-6', 
                  iconSize: 'w-12 h-12', 
                  textSize: 'text-base', 
                  iconPos: 'flex-col',
                  rounded: 'rounded-2xl',
                  shadow: 'shadow-lg hover:shadow-xl',
                  transform: 'hover:-rotate-1 hover:scale-105'
                }
              ];
              
              const variant = cardVariants[index];
              const isHorizontal = variant.iconPos.includes('flex-row');
              
              return (
                <div 
                  key={index}
                  className={`${feature.color} border ${variant.rounded} ${variant.padding} ${variant.shadow} 
                    transition-all duration-500 ease-out ${variant.transform} break-inside-avoid mb-6 
                    backdrop-blur-sm border-white/20 relative overflow-hidden group
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    background: index % 3 === 0 ? `linear-gradient(135deg, ${feature.color.replace('bg-', '')} 0%, rgba(255,255,255,0.8) 100%)` : ''
                  }}
                >
                  {/* Subtle background pattern for some cards */}
                  {index % 4 === 0 && (
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%), 
                                         radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15), transparent 50%)`
                      }}></div>
                    </div>
                  )}

                  <div className={`flex ${variant.iconPos} ${isHorizontal ? 'space-x-4' : 'items-center'} relative z-10`}>
                    <div className={`${variant.iconSize} ${isHorizontal ? '' : 'mb-4'} flex items-center justify-center ${variant.rounded}`}>
                      <div className={`${variant.iconSize} ${feature.iconColor} ${variant.rounded} flex items-center justify-center 
                        group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                        {/* Icon background glow effect for larger cards */}
                        {variant.iconSize.includes('16') && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        )}
                        {React.createElement(feature.icon, { 
                          className: `${
                            variant.iconSize === 'w-16 h-16' ? 'w-8 h-8' :
                            variant.iconSize === 'w-14 h-14' ? 'w-7 h-7' :
                            variant.iconSize === 'w-13 h-13' ? 'w-6 h-6' :
                            variant.iconSize === 'w-12 h-12' ? 'w-6 h-6' :
                            variant.iconSize === 'w-11 h-11' ? 'w-5 h-5' : 'w-5 h-5'
                          } relative z-10`
                        })}
                      </div>
                    </div>
                    
                    <div className={isHorizontal ? 'flex-1' : 'text-center'}>
                      <h3 className={`${variant.textSize} font-bold mb-3 ${isHorizontal ? 'text-left' : ''} 
                        group-hover:text-gray-800 transition-colors duration-300`} 
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {feature.title}
                      </h3>
                      
                      <p className={`text-gray-600 leading-relaxed ${
                        variant.textSize === 'text-2xl' ? 'text-lg' :
                        variant.textSize === 'text-xl' ? 'text-base' : 
                        variant.textSize === 'text-lg' ? 'text-sm' : 'text-sm'
                      } ${isHorizontal ? 'text-left' : ''}`} 
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Enhanced extra content with more variety */}
                  {index === 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200/50">
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-blue-700 font-medium">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            <span>Start Your Journey</span>
                          </div>
                          <div className="text-xs text-gray-500">Step 1</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="mt-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 font-medium">Premium Feature</span>
                      </div>
                      <div className="text-xs text-gray-500 bg-white/30 rounded-lg p-2">
                        Used by 10,000+ businesses worldwide
                      </div>
                    </div>
                  )}
                  
                  {index === 4 && (
                    <div className="mt-6 pt-4 border-t border-gray-200/50">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-cyan-600">99.9%</div>
                          <div className="text-xs text-gray-500">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-cyan-600">24/7</div>
                          <div className="text-xs text-gray-500">Support</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {index === 6 && (
                    <div className="mt-6">
                      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-xs text-indigo-700 font-medium">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                            <span>Enterprise Ready</span>
                          </div>
                          <div className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            New
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          Advanced security & compliance features included
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Floating action indicator for some cards */}
                  {[1, 3, 5].includes(index) && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 border-2 border-gray-400 rounded-sm border-b-0 border-r-0 transform rotate-45"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
