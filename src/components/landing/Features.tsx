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
  const { t } = useTranslation();

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
    <section id="features" className={`${isMobile ? "py-8" : "py-12 md:py-16"} bg-gray-50`}>
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto ${isMobile ? "mb-6" : "mb-8 md:mb-10"} transition-all duration-700 ${
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

        {/* Vertical Features Grid - All Layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${feature.color} rounded-lg border p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`w-10 h-10 ${feature.iconColor} rounded-lg flex items-center justify-center mb-3`}>
                {React.createElement(feature.icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.title}</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
