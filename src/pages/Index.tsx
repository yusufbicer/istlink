import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import BlogPreview from '@/components/landing/BlogPreview';
import Footer from '@/components/landing/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { PackageCheck, FileText, Receipt, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const isMobile = useIsMobile();

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
      iconColor: "text-slate-600",
      iconBg: "bg-slate-100",
      borderColor: "border-slate-200",
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
      borderColor: "border-blue-300",
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
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      borderColor: "border-emerald-200",
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
                Choose Your Plan
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Transparent pricing that scales with your business needs.
              </p>
            </div>
            
            {/* Mobile: Enhanced Pricing Tabs */}
            {isMobile ? (
              <div className="mb-6">
                <Tabs defaultValue="growth" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4 bg-white p-1 rounded-lg shadow-sm border">
                    <TabsTrigger value="starter" className="text-xs py-2 data-[state=active]:bg-slate-600 data-[state=active]:text-white rounded transition-all" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Starter</TabsTrigger>
                    <TabsTrigger value="growth" className="text-xs py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded transition-all" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Growth</TabsTrigger>
                    <TabsTrigger value="enterprise" className="text-xs py-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded transition-all" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Enterprise</TabsTrigger>
                  </TabsList>
                  
                  {pricingPlans.map((plan, index) => {
                    const PlanIcon = plan.icon;
                    return (
                      <TabsContent key={index} value={plan.name.toLowerCase()}>
                        <div className={`bg-white rounded-lg border-2 ${plan.borderColor} shadow-sm overflow-hidden relative`}>
                          <div className="p-5">
                            <div className={`w-10 h-10 ${plan.iconBg} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                              <PlanIcon className={`h-5 w-5 ${plan.iconColor}`} />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.name}</h3>
                            <p className="text-gray-600 mb-3 text-center text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.description}</p>
                            <div className="text-center mb-1">
                              <span className="text-2xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.price}</span>
                            </div>
                            <div className="text-gray-600 text-sm mb-2 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.period}</div>
                            {plan.additionalInfo && (
                              <div className="text-xs text-gray-500 mb-3 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{plan.additionalInfo}</div>
                            )}
                            
                            <div className="border-t pt-3">
                              <ul className="space-y-1.5">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-xs text-gray-700">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                                    <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{feature}</span>
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
  );
};

export default Index;
