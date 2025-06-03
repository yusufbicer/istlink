
import { useEffect, useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { PackageCheck, FileText, Receipt, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ListIcon, CheckIcon, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [blogCollapsed, setBlogCollapsed] = useState(true);

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
      name: "Starter",
      price: "$499",
      period: "One-time fee",
      description: "Perfect for first-time users exploring Turkish supply chain services",
      additionalInfo: "+ Bank transfer fees",
      icon: PackageCheck,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      features: [
        "Single consolidated shipment",
        "Supplier payment handling",
        "Single Bill of Lading",
        "Documentation support"
      ]
    },
    {
      name: "Growth",
      price: "2%",
      period: "Of the total order value",
      description: "Our most popular option for growing businesses with regular shipments",
      additionalInfo: "+ Bank transfer fees",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      features: [
        "Multiple consolidated shipments",
        "Digital procurement dashboard",
        "Real-time tracking",
        "Preferred shipping rates",
        "Payment handling & protection"
      ]
    },
    {
      name: "Enterprise",
      price: "1.5%",
      period: "After 5 consolidations/month",
      description: "For businesses with high-volume international shipping needs",
      additionalInfo: "Volume-based discounting after 5 consolidations/month",
      icon: Receipt,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      features: [
        "Volume discount pricing",
        "Priority consolidation",
        "Customized shipping schedule",
        "Advanced analytics & reporting",
        "Warehouse storage options",
        "Strategic sourcing assistance"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Improved spacing for mobile/tablet */}
        <div className={isMobile ? "mt-8" : "mt-12"}>
          <Features />
        </div>
        
        {/* Improved spacing for mobile/tablet */}
        <div className={isMobile ? "mt-8" : "mt-12"}>
          <HowItWorks />
        </div>
        
        {/* Updated Pricing Section with Improved Tablet Responsiveness */}
        <section id="pricing" className={`py-16 md:py-20 bg-white ${isMobile ? "mt-0" : ""}`}>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Flexible Consolidation Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Transparent pricing designed to scale with your business needs. Pay only for what you use.
              </p>
            </div>
            
            {/* Mobile: Interactive Pricing Tabs */}
            {isMobile ? (
              <div className="mb-10">
                <Tabs defaultValue="starter" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger value="starter" className="text-xs py-2">Starter</TabsTrigger>
                    <TabsTrigger value="growth" className="text-xs py-2">Growth</TabsTrigger>
                    <TabsTrigger value="enterprise" className="text-xs py-2">Enterprise</TabsTrigger>
                  </TabsList>
                  
                  {pricingPlans.map((plan, index) => {
                    const PlanIcon = plan.icon;
                    return (
                      <TabsContent key={index} value={plan.name.toLowerCase()} className="pt-2">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                          <div className="p-6">
                            <div className={`w-12 h-12 ${plan.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                              <PlanIcon className={`h-6 w-6 ${plan.iconColor}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                            <p className="text-gray-600 mb-4 min-h-[50px]">{plan.description}</p>
                            <div className="flex items-baseline mb-2">
                              <span className="text-3xl font-bold">{plan.price}</span>
                            </div>
                            <div className="text-gray-600 text-sm mb-4">{plan.period}</div>
                            {plan.additionalInfo && (
                              <div className="text-sm text-gray-500 mb-4">{plan.additionalInfo}</div>
                            )}
                            
                            <div className="border-t border-gray-100 pt-4">
                              <h4 className="font-medium mb-3">Features</h4>
                              <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-sm text-gray-700">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 ${isTablet ? 'px-4' : ''}`}>
                {pricingPlans.map((plan, index) => {
                  const PlanIcon = plan.icon;
                  const isPopular = plan.name === "Growth";
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-white rounded-xl border 
                        ${isPopular ? 'border-blue-200 shadow-lg relative' : 'border-gray-100 shadow-sm'} 
                        overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md
                        ${isTablet ? 'flex-1' : ''}`}
                    >
                      {isPopular && (
                        <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-xs font-bold text-center py-1">
                          MOST POPULAR
                        </div>
                      )}
                      <div className={`p-6 ${isPopular ? 'pt-8' : ''} flex flex-col h-full`}>
                        <div className="flex-grow">
                          <div className={`w-12 h-12 ${plan.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                            <PlanIcon className={`h-6 w-6 ${plan.iconColor}`} />
                          </div>
                          <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                          <p className={`text-gray-600 mb-4 ${isTablet ? 'text-sm' : ''} min-h-[50px]`}>
                            {plan.description}
                          </p>
                          <div className="flex items-baseline mb-1">
                            <span className="text-3xl font-bold">{plan.price}</span>
                          </div>
                          <div className={`text-gray-600 ${isTablet ? 'text-xs' : 'text-sm'} mb-2`}>
                            {plan.period}
                          </div>
                          {plan.additionalInfo && (
                            <div className={`${isTablet ? 'text-xs' : 'text-sm'} text-gray-500 mb-4`}>
                              {plan.additionalInfo}
                            </div>
                          )}
                          <ul className={`mt-6 space-y-3 ${isTablet ? 'text-sm' : ''} min-h-[280px]`}>
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Index;
