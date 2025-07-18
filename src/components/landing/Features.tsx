import React, { useEffect, useRef, useState } from 'react';
import { Package, TruckIcon, UsersIcon, FileTextIcon, CreditCardIcon, GlobeIcon, ShieldCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: Package,
      title: t('consolidatedShipping'),
      description: t('consolidatedShippingDesc'),
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600 bg-blue-100",
      footnote: "saveShippingCosts"
    },
    {
      icon: TruckIcon,
      title: t('singleBillOfLadingTitle'),
      description: t('singleBillOfLadingDesc'),
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600 bg-green-100",
      footnote: "reduceDocumentation"
    },
    {
      icon: CreditCardIcon,
      title: t('centralizedPayments'),
      description: t('centralizedPaymentsDesc'),
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600 bg-purple-100",
      footnote: "onePaymentAllSuppliers"
    },
    {
      icon: FileTextIcon,
      title: t('simplifiedDocumentation'),
      description: t('simplifiedDocumentationDesc'),
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600 bg-amber-100",
      footnote: "digitalFirstApproach"
    },
    {
      icon: GlobeIcon,
      title: t('globalCompliance'),
      description: t('globalComplianceDesc'),
      color: "bg-cyan-50 border-cyan-200",
      iconColor: "text-cyan-600 bg-cyan-100",
      footnote: "countriesSupported"
    },
    {
      icon: UsersIcon,
      title: t('supplierManagement'),
      description: t('supplierManagementDesc'),
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600 bg-pink-100",
      footnote: "unlimitedSupplierNetwork"
    },
    {
      icon: ShieldCheck,
      title: t('deliveryGuarantee'),
      description: t('deliveryGuaranteeDesc'),
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600 bg-indigo-100",
      footnote: "onTimeDeliveryRate"
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
                <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.title}</h3>
                <p className="text-gray-600 text-xs mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature.description}</p>
                <div className="mt-3 pt-2 border-t border-gray-200/50">
                  <div className="text-xs text-gray-500 font-medium">{t(feature.footnote)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop & Tablet: Masonry/Pinterest Style Layout */}
        <div className={`${isMobile ? 'hidden' : 'block'} max-w-6xl mx-auto`}>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {features.map((feature, index) => {
              // Different heights and content for masonry effect
              const cardVariants = [
                { height: 'h-auto', padding: 'p-4', iconSize: 'w-10 h-10', textSize: 'text-lg' },
                { height: 'h-auto', padding: 'p-6', iconSize: 'w-12 h-12', textSize: 'text-lg' },
                { height: 'h-auto', padding: 'p-5', iconSize: 'w-11 h-11', textSize: 'text-lg' },
                { height: 'h-auto', padding: 'p-4', iconSize: 'w-10 h-10', textSize: 'text-lg' },
                { height: 'h-auto', padding: 'p-6', iconSize: 'w-12 h-12', textSize: 'text-lg' },
                { height: 'h-auto', padding: 'p-5', iconSize: 'w-11 h-11', textSize: 'text-lg' },
                { height: 'h-auto', padding: 'p-4', iconSize: 'w-10 h-10', textSize: 'text-lg' }
              ];
              
              const variant = cardVariants[index];
              
              return (
                <div 
                  key={index}
                  className={`${feature.color} rounded-lg border ${variant.padding} shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 break-inside-avoid mb-4 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`${variant.iconSize} mb-4 flex items-center justify-center rounded-lg`}>
                    <div className={`${variant.iconSize} ${feature.iconColor} rounded-lg flex items-center justify-center`}>
                      {React.createElement(feature.icon, { 
                        className: variant.iconSize === 'w-12 h-12' ? "w-6 h-6" : 
                                  variant.iconSize === 'w-11 h-11' ? "w-5 h-5" : "w-5 h-5" 
                      })}
                    </div>
                  </div>
                  
                  <h3 className={`${variant.textSize} font-semibold mb-3`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {feature.title}
                  </h3>
                  
                  <p className={`text-gray-600 leading-relaxed mb-3 text-sm`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {feature.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 font-medium">
                    {t(feature.footnote)}
                  </div>
                  
                  {/* Add extra content for some cards to create height variation */}
                  {index === 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span>{t('mostPopularFeature')}</span>
                      </div>
                    </div>
                  )}
                  
                  {index === 4 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        <span>{t('essentialFeature')}</span>
                      </div>
                    </div>
                  )}
                  
                  {index === 6 && (
                    <div className="mt-4">
                      <div className="bg-white/50 rounded-lg p-3 mt-3">
                        <div className="flex items-center text-xs text-gray-600">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                          <span>{t('premiumSupportIncluded')}</span>
                        </div>
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
