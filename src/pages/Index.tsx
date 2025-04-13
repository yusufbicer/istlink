
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PackageCheck, FileText, Receipt, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ListIcon, CheckIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const isMobile = useIsMobile();
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

  // Pricing plans data
  const pricingPlans = [
    {
      name: "First Trial",
      price: "$299",
      period: "flat rate",
      description: "Perfect for testing our services",
      icon: PackageCheck,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      features: [
        "Up to 5 orders",
        "Single consolidation",
        "Basic documentation",
        "Email support"
      ]
    },
    {
      name: "Business",
      price: "$799",
      period: "/month",
      description: "For growing businesses",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      features: [
        "Up to 25 orders/month",
        "Multiple consolidations",
        "Full documentation",
        "Dedicated account manager"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale operations",
      icon: Receipt,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      features: [
        "Unlimited orders",
        "Priority consolidation",
        "Custom documentation",
        "24/7 priority support"
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
        
        {/* Updated Pricing Section - Interactive Comparison on Mobile */}
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
                <Tabs defaultValue="first-trial" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger value="first-trial" className="text-xs py-2">First Trial</TabsTrigger>
                    <TabsTrigger value="business" className="text-xs py-2">Business</TabsTrigger>
                    <TabsTrigger value="enterprise" className="text-xs py-2">Enterprise</TabsTrigger>
                  </TabsList>
                  
                  {pricingPlans.map((plan, index) => {
                    const PlanIcon = plan.icon;
                    return (
                      <TabsContent key={index} value={plan.name.toLowerCase().replace(' ', '-')} className="pt-2">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                          <div className="p-6">
                            <div className={`w-12 h-12 ${plan.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                              <PlanIcon className={`h-6 w-6 ${plan.iconColor}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                            <p className="text-gray-600 mb-4">{plan.description}</p>
                            <div className="flex items-baseline mb-6">
                              <span className="text-3xl font-bold">{plan.price}</span>
                              {plan.period && <span className="text-gray-600 ml-1">{plan.period}</span>}
                            </div>
                            
                            <div className="border-t border-gray-100 pt-4">
                              <h4 className="font-medium mb-2 flex items-center">
                                <ListIcon className="h-4 w-4 mr-2 text-metallic-blue" />
                                Features
                              </h4>
                              <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <button className="w-full bg-metallic-blue hover:bg-metallic-dark text-white rounded-lg mt-6 py-2.5 font-medium">
                              {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                            </button>
                          </div>
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {/* First Trial */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <PackageCheck className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">First Trial</h3>
                    <p className="text-gray-600 mb-4">Perfect for testing our services</p>
                    <div className="flex items-baseline mb-1">
                      <span className="text-3xl font-bold">$299</span>
                      <span className="text-gray-600 ml-1">flat rate</span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Up to 5 orders</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Single consolidation</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Basic documentation</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Email support</span>
                      </li>
                    </ul>
                    <button className="w-full bg-metallic-blue hover:bg-metallic-dark text-white rounded-lg mt-8 py-2 font-medium">
                      Get Started
                    </button>
                  </div>
                </div>
                
                {/* Business */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Business</h3>
                    <p className="text-gray-600 mb-4">For growing businesses</p>
                    <div className="flex items-baseline mb-1">
                      <span className="text-3xl font-bold">$799</span>
                      <span className="text-gray-600 ml-1">/month</span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Up to 25 orders/month</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Multiple consolidations</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Full documentation</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Dedicated account manager</span>
                      </li>
                    </ul>
                    <button className="w-full bg-metallic-blue hover:bg-metallic-dark text-white rounded-lg mt-8 py-2 font-medium">
                      Get Started
                    </button>
                  </div>
                </div>
                
                {/* Enterprise */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Receipt className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Enterprise</h3>
                    <p className="text-gray-600 mb-4">For large-scale operations</p>
                    <div className="flex items-baseline mb-1">
                      <span className="text-3xl font-bold">Custom</span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Unlimited orders</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Priority consolidation</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">Custom documentation</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">24/7 priority support</span>
                      </li>
                    </ul>
                    <button className="w-full bg-metallic-blue hover:bg-metallic-dark text-white rounded-lg mt-8 py-2 font-medium">
                      Contact Sales
                    </button>
                  </div>
                </div>
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
