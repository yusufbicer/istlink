import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import BlogPreview from '@/components/landing/BlogPreview';
import Footer from '@/components/landing/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { PackageCheck, FileText, Receipt, CheckCircle2, DollarSign, Timer, AlertCircle, Package, CreditCard, CheckCircle, GitMerge, Database, Archive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';

const Index = () => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Scroll to section if hash is present in URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);


  const pricingPlans = [
    {
      name: t('starter'),
      price: "$499",
      period: t('oneTimeFee'),
      description: t('starterDesc'),
      additionalInfo: t('bankTransferFees'),
      icon: PackageCheck,
      iconColor: "text-slate-600",
      iconBg: "bg-slate-100",
      borderColor: "border-slate-200",
      features: [
        t('singleConsolidatedShipmentFeature'),
        t('supplierPaymentHandling'),
        t('singleBillOfLadingFeature'),
        t('documentationSupport')
      ]
    },
    {
      name: t('growth'),
      price: "2%",
      period: t('totalOrderValue'),
      description: t('growthDesc'),
      additionalInfo: t('bankTransferFees'),
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      borderColor: "border-blue-300",
      features: [
        t('multipleConsolidatedShipments'),
        t('digitalProcurementDashboard'),
        t('realTimeTracking'),
        t('preferredShippingRates'),
        t('paymentHandlingProtection')
      ]
    },
    {
      name: t('enterprise'),
      price: "1.5%",
      period: t('after5Consolidations'),
      description: t('enterpriseDesc'),
      additionalInfo: t('volumeDiscounting'),
      icon: Receipt,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      borderColor: "border-emerald-200",
      features: [
        t('volumeDiscountPricing'),
        t('priorityConsolidation'),
        t('customizedShippingSchedule'),
        t('advancedAnalyticsReporting'),
        t('warehouseStorageOptions'),
        t('strategicSourcingAssistance')
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="Turkish Export Consolidation Platform - Streamline Your Supply Chain"
        description="Revolutionize your Turkish supply chain with Bundleist's AI-powered export consolidation platform. Reduce shipping costs by 65%, streamline documentation 15x faster, save 80% time. Connect with verified Turkish suppliers seamlessly."
        keywords="Turkish export consolidation, supply chain management Turkey, Turkish suppliers platform, export logistics Turkey, shipping consolidation, supplier management software, Turkey B2B marketplace, export documentation, freight consolidation, Turkish trade platform, Istanbul suppliers, supply chain optimization, export streamlining, consolidation services Turkey, Turkish manufacturer sourcing"
      />
      <StructuredData pageType="home" />
      <div className="min-h-screen bg-white flex flex-col" key={i18n.language}>
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Statistics Section */}
        <section className={`${isMobile ? "py-6" : "py-12"} bg-white`}>
          <div className="container mx-auto px-6">
            <div className={`text-center max-w-3xl mx-auto ${isMobile ? "mb-6" : "mb-8"}`}>
              <h2 className={`${isMobile ? "text-xl" : "text-2xl md:text-3xl"} font-bold ${isMobile ? "mb-2" : "mb-4"} text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('statisticsTitle')}
              </h2>
              <p className={`text-gray-600 ${isMobile ? "text-sm" : ""}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('statisticsSubtitle')}
              </p>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 ${isMobile ? "gap-4" : "gap-6"} max-w-4xl mx-auto`}>
              <div className={`bg-gradient-to-br from-blue-50 to-purple-50 ${isMobile ? "p-4" : "p-6"} rounded-xl border border-blue-100 text-center`}>
                <div className={`${isMobile ? "w-10 h-10 mb-3" : "w-12 h-12 mb-4"} mx-auto bg-blue-100 rounded-full flex items-center justify-center`}>
                  <FileText className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-blue-600`} />
                </div>
                <div className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-blue-600 ${isMobile ? "mb-1" : "mb-2"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>15x</div>
                <div className={`font-semibold text-gray-900 ${isMobile ? "mb-1 text-sm" : "mb-2"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{t('fasterDocumentation')}</div>
                <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('singleBillOfLading')}
                </div>
              </div>
              
              <div className={`bg-gradient-to-br from-emerald-50 to-blue-50 ${isMobile ? "p-4" : "p-6"} rounded-xl border border-emerald-100 text-center`}>
                <div className={`${isMobile ? "w-10 h-10 mb-3" : "w-12 h-12 mb-4"} mx-auto bg-emerald-100 rounded-full flex items-center justify-center`}>
                  <DollarSign className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-emerald-600`} />
                </div>
                <div className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-emerald-600 ${isMobile ? "mb-1" : "mb-2"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>65%</div>
                <div className={`font-semibold text-gray-900 ${isMobile ? "mb-1 text-sm" : "mb-2"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{t('costReduction')}</div>
                <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('lowerShippingCosts')}
                </div>
              </div>
              
              <div className={`bg-gradient-to-br from-purple-50 to-pink-50 ${isMobile ? "p-4" : "p-6"} rounded-xl border border-purple-100 text-center`}>
                <div className={`${isMobile ? "w-10 h-10 mb-3" : "w-12 h-12 mb-4"} mx-auto bg-purple-100 rounded-full flex items-center justify-center`}>
                  <Timer className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-purple-600`} />
                </div>
                <div className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-purple-600 ${isMobile ? "mb-1" : "mb-2"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>80%</div>
                <div className={`font-semibold text-gray-900 ${isMobile ? "mb-1 text-sm" : "mb-2"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{t('timeSavings')}</div>
                <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {t('streamlinedProcess')}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Comparison Section */}
        <section className={`${isMobile ? "py-6" : "py-16"} bg-gray-50`}>
          <div className="container mx-auto px-6">
            <div className={`text-center max-w-4xl mx-auto ${isMobile ? "mb-6" : "mb-12"}`}>
              <h2 className={`${isMobile ? "text-xl" : "text-3xl md:text-4xl"} font-bold ${isMobile ? "mb-3" : "mb-6"} text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('comparisonTitle')}
              </h2>
              <p className={`${isMobile ? "text-sm" : "text-lg"} text-gray-600 max-w-2xl mx-auto`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('comparisonSubtitle')}
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${isMobile ? "gap-4" : "gap-8"}`}>
                {/* Traditional Approach */}
                <div className={`bg-white rounded-2xl ${isMobile ? "p-4" : "p-8"} shadow-lg border border-red-100 relative`}>
                  {/* Header with icon */}
                  <div className={`flex items-center justify-between ${isMobile ? "mb-4" : "mb-6"}`}>
                    <div className="flex items-center">
                      <div className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} bg-red-100 rounded-xl flex items-center justify-center ${isMobile ? "mr-3" : "mr-4"}`}>
                        <AlertCircle className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-red-500`} />
                      </div>
                      <div>
                        <h3 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('traditionalImports')}
                        </h3>
                        <p className={`${isMobile ? "text-xs" : "text-sm"} text-red-500 font-medium`}>{t('fragmentedComplex')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Problems list */}
                  <div className={`${isMobile ? "space-y-2 mb-4" : "space-y-4 mb-8"}`}>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-red-500 text-sm font-bold">×</span>
                      </div>
                      <div>
                        <div className={`font-semibold text-gray-900 ${isMobile ? "mb-0.5 text-sm" : "mb-1"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('multipleShipments')}
                        </div>
                        <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('multipleShipmentsDesc')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-red-500 text-sm font-bold">×</span>
                      </div>
                      <div>
                        <div className={`font-semibold text-gray-900 ${isMobile ? "mb-0.5 text-sm" : "mb-1"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('complexDocumentation')}
                        </div>
                        <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('complexDocumentationDesc')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-red-500 text-sm font-bold">×</span>
                      </div>
                      <div>
                        <div className={`font-semibold text-gray-900 ${isMobile ? "mb-0.5 text-sm" : "mb-1"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('paymentRisks')}
                        </div>
                        <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('paymentRisksDesc')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom stats */}
                  <div className={`border-t border-gray-100 ${isMobile ? "pt-3" : "pt-6"}`}>
                    <div className={`grid grid-cols-3 ${isMobile ? "gap-2" : "gap-4"} text-center`}>
                      <div className="text-center">
                        <div className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-red-500 mb-1`}>5%</div>
                        <div className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-600`}>{t('responseRate')}</div>
                      </div>
                      <div className="text-center">
                        <div className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-red-500 mb-1`}>80%</div>
                        <div className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-600`}>{t('delays')}</div>
                      </div>
                      <div className="text-center">
                        <div className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-red-500 mb-1`}>0%</div>
                        <div className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-600`}>{t('protection')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Smart Consolidation */}
                <div className={`bg-white rounded-2xl ${isMobile ? "p-4" : "p-8"} shadow-lg border-2 border-blue-200 relative`}>
                  {/* Header with icon */}
                  <div className={`flex items-center justify-between ${isMobile ? "mb-4" : "mb-6"}`}>
                    <div className="flex items-center">
                      <div className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} bg-blue-100 rounded-xl flex items-center justify-center ${isMobile ? "mr-3" : "mr-4"}`}>
                        <CheckCircle className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-blue-600`} />
                      </div>
                      <div>
                        <h3 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('bundleistSolution')}
                        </h3>
                        <p className={`${isMobile ? "text-xs" : "text-sm"} text-blue-600 font-medium`}>{t('smartConsolidated')}</p>
                      </div>
                    </div>
                    <div className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white ${isMobile ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"} rounded-full font-medium`}>
                      {t('recommended')}
                    </div>
                  </div>
                  
                  {/* Benefits list */}
                  <div className={`${isMobile ? "space-y-2 mb-4" : "space-y-4 mb-8"}`}>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className={`font-semibold text-gray-900 ${isMobile ? "mb-0.5 text-sm" : "mb-1"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('singleConsolidatedShipment')}
                        </div>
                        <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('singleConsolidatedShipmentDesc')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className={`font-semibold text-gray-900 ${isMobile ? "mb-0.5 text-sm" : "mb-1"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('streamlinedDocumentation')}
                        </div>
                        <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('streamlinedDocumentationDesc')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className={`font-semibold text-gray-900 ${isMobile ? "mb-0.5 text-sm" : "mb-1"}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('securePaymentHandling')}
                        </div>
                        <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {t('securePaymentHandlingDesc')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom stats */}
                  <div className={`border-t border-blue-100 ${isMobile ? "pt-3" : "pt-6"}`}>
                    <div className={`grid grid-cols-3 ${isMobile ? "gap-2" : "gap-4"} text-center`}>
                      <div className="text-center">
                        <div className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-blue-600 mb-1`}>15x</div>
                        <div className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-600`}>{t('fasterProcess')}</div>
                      </div>
                      <div className="text-center">
                        <div className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-blue-600 mb-1`}>65%</div>
                        <div className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-600`}>{t('costSavings')}</div>
                      </div>
                      <div className="text-center">
                        <div className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-blue-600 mb-1`}>100%</div>
                        <div className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-600`}>{t('protected')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className={isMobile ? "-mt-2" : "-mt-4"}>
          <Features />
        </div>
        
        <div className={isMobile ? "mt-2" : "mt-4"}>
          <HowItWorks />
        </div>
        
        {/* Pricing Section */}
        <section id="pricing" className={`${isMobile ? "py-8" : "py-10 md:py-12"} bg-gray-50`}>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('choosePlan')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {t('transparentPricing')}
              </p>
            </div>
            
            {/* Mobile: Compact Pricing Cards */}
            {isMobile ? (
              <div className="space-y-3">
                {pricingPlans.map((plan, index) => {
                  const PlanIcon = plan.icon;
                  return (
                    <div key={index} className={`bg-white rounded-lg p-3 border-2 ${plan.borderColor} shadow-sm`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`${plan.iconBg} w-8 h-8 rounded-lg flex items-center justify-center mr-3`}>
                            <PlanIcon className={`h-4 w-4 ${plan.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-gray-900">{plan.name}</h3>
                            <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-md p-2 mb-2">
                        <p className="text-xs text-blue-700 text-center font-medium">
                          {index === 0 && "One-time fee for single consolidation"}
                          {index === 1 && "2% fee on total order value to suppliers"}
                          {index === 2 && "1.5% fee after 5+ consolidations"}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-1">
                        {plan.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start text-xs text-gray-600">
                            <div className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                            <span className="leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                {pricingPlans.map((plan, index) => {
                  const PlanIcon = plan.icon;
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-white rounded-lg border-2 ${plan.borderColor} shadow-sm overflow-hidden transition-all hover:shadow-md relative`}
                    >
                      <div className="p-4 md:p-6 flex flex-col h-full">
                        <div className="flex-grow">
                          <div className={`w-10 h-10 md:w-12 md:h-12 ${plan.iconBg} rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto`}>
                            <PlanIcon className={`h-5 w-5 md:h-6 md:w-6 ${plan.iconColor}`} />
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.name}</h3>
                          <p className="text-gray-600 mb-3 md:mb-4 text-center text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.description}</p>
                          <div className="text-center mb-1">
                            <span className="text-2xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.price}</span>
                          </div>
                          <div className="text-gray-600 text-sm mb-2 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.period}</div>
                          {plan.additionalInfo && (
                            <div className="text-xs text-gray-500 mb-3 md:mb-4 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.additionalInfo}</div>
                          )}
                          
                          <div className="border-t pt-3 md:pt-4">
                            <ul className="space-y-1.5 md:space-y-2">
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 text-xs md:text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        
        <BlogPreview />
        
        <Footer />
      </main>
      </div>
    </>
  );
};

export default Index;
