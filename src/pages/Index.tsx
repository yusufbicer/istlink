
import { useEffect, useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { PackageCheck, FileText, Receipt, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ListIcon, CheckIcon, CheckCircle2, Star } from 'lucide-react';
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
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
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
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      borderColor: "border-emerald-200",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      isPopular: true,
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
      iconBg: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
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
        
        {/* Enhanced Pricing Section with Modern Styling */}
        <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-50/50 via-transparent to-transparent opacity-60" />
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-emerald-100 rounded-full filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-15" />
          
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 rounded-full mb-6">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">Transparent Pricing</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-900">
                Choose Your Consolidation Plan
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Flexible pricing designed to scale with your business needs. No hidden fees, just transparent value.
              </p>
            </div>
            
            {/* Mobile: Enhanced Pricing Tabs */}
            {isMobile ? (
              <div className="mb-10">
                <Tabs defaultValue="growth" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-8 bg-white p-1.5 rounded-xl shadow-lg border border-gray-200">
                    <TabsTrigger value="starter" className="text-xs py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all">Starter</TabsTrigger>
                    <TabsTrigger value="growth" className="text-xs py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all">Growth</TabsTrigger>
                    <TabsTrigger value="enterprise" className="text-xs py-3 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">Enterprise</TabsTrigger>
                  </TabsList>
                  
                  {pricingPlans.map((plan, index) => {
                    const PlanIcon = plan.icon;
                    return (
                      <TabsContent key={index} value={plan.name.toLowerCase()} className="pt-2">
                        <div className={`bg-white rounded-2xl border-2 ${plan.borderColor} shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300`}>
                          {plan.isPopular && (
                            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-center py-2">
                              <span className="text-xs font-bold flex items-center justify-center">
                                <Star className="w-3 h-3 mr-1" />
                                MOST POPULAR
                              </span>
                            </div>
                          )}
                          <div className="p-8">
                            <div className={`w-16 h-16 ${plan.iconBg} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                              <PlanIcon className={`h-8 w-8 ${plan.iconColor}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                            <p className="text-gray-600 mb-6 text-center min-h-[60px]">{plan.description}</p>
                            <div className="text-center mb-2">
                              <span className="text-4xl font-bold">{plan.price}</span>
                            </div>
                            <div className="text-gray-600 text-sm mb-4 text-center">{plan.period}</div>
                            {plan.additionalInfo && (
                              <div className="text-sm text-gray-500 mb-6 text-center">{plan.additionalInfo}</div>
                            )}
                            
                            <button className={`w-full ${plan.buttonColor} text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-6`}>
                              Get Started
                            </button>
                            
                            <div className="border-t border-gray-100 pt-6">
                              <h4 className="font-semibold mb-4 text-center">What's included</h4>
                              <ul className="space-y-3">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-sm text-gray-700">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {pricingPlans.map((plan, index) => {
                  const PlanIcon = plan.icon;
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-white rounded-2xl border-2 ${plan.borderColor} shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative group ${
                        plan.isPopular ? 'transform scale-105' : ''
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg">
                            <span className="text-xs font-bold flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              MOST POPULAR
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className={`p-8 ${plan.isPopular ? 'pt-12' : ''} flex flex-col h-full`}>
                        <div className="flex-grow">
                          <div className={`w-16 h-16 ${plan.iconBg} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <PlanIcon className={`h-8 w-8 ${plan.iconColor}`} />
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                          <p className="text-gray-600 mb-6 text-center min-h-[60px]">{plan.description}</p>
                          <div className="text-center mb-2">
                            <span className="text-4xl font-bold">{plan.price}</span>
                          </div>
                          <div className="text-gray-600 text-sm mb-4 text-center">{plan.period}</div>
                          {plan.additionalInfo && (
                            <div className="text-sm text-gray-500 mb-6 text-center">{plan.additionalInfo}</div>
                          )}
                          
                          <button className={`w-full ${plan.buttonColor} text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-6`}>
                            Get Started
                          </button>
                          
                          <div className="border-t border-gray-100 pt-6">
                            <h4 className="font-semibold mb-4 text-center">What's included</h4>
                            <ul className="space-y-3">
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{feature}</span>
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
            
            {/* Trust indicators */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">Trusted by businesses worldwide</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1" />
                  No setup fees
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1" />
                  Cancel anytime
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1" />
                  24/7 support
                </span>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Index;
