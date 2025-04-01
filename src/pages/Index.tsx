
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PackageCheck, FileText, Receipt, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Index = () => {
  const isMobile = useIsMobile();
  const blogSliderRef = useRef<HTMLDivElement>(null);
  const pricingSliderRef = useRef<HTMLDivElement>(null);
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

  // Scroll functions for mobile sliders
  const scrollSlider = (sliderRef: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const scrollAmount = sliderRef.current.offsetWidth * 0.85;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Reduced spacing on mobile */}
        <div className={isMobile ? "mt-0" : "mt-0"}>
          <Features />
        </div>
        
        {/* Reduced spacing on mobile */}
        <div className={isMobile ? "mt-0" : "mt-0"}>
          <HowItWorks />
        </div>
        
        {/* Blog Preview Section - Collapsible on Mobile */}
        <section id="blog" className={`py-16 md:py-20 bg-gray-50 ${isMobile ? "mt-0" : ""}`}>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
                Our Blog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest Insights & News
              </h2>
              <p className="text-xl text-gray-600">
                Stay updated with the latest trends and tips in cross-border commerce.
              </p>
            </div>
            
            {/* Mobile Blog Posts - Collapsible */}
            {isMobile ? (
              <div className="mb-10">
                <Collapsible open={!blogCollapsed} onOpenChange={(open) => setBlogCollapsed(!open)}>
                  <CollapsibleTrigger className="w-full py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 font-medium flex justify-between items-center mb-3">
                    <span>Latest Articles</span>
                    {blogCollapsed ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronUp className="h-5 w-5" />
                    )}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-3">
                    {/* Blog Post 1 */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500">May 15, 2023</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-blue-600">Shipping</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Understanding Turkish Export Regulations in 2023</h3>
                        <p className="text-gray-600 mb-3">
                          A comprehensive guide to navigating the complex export regulations for goods leaving Turkey.
                        </p>
                        <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                          Read More →
                        </a>
                      </div>
                    </div>
                    
                    {/* Blog Post 2 */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500">April 28, 2023</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-blue-600">Consolidation</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">5 Ways to Reduce Shipping Costs with Consolidation</h3>
                        <p className="text-gray-600 mb-3">
                          Learn how businesses are saving up to 40% on shipping costs by implementing strategic consolidation techniques.
                        </p>
                        <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                          Read More →
                        </a>
                      </div>
                    </div>
                    
                    {/* Blog Post 3 */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500">April 10, 2023</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-blue-600">Success Story</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Case Study: How Company XYZ Optimized Their Supply Chain</h3>
                        <p className="text-gray-600 mb-3">
                          Real-world example of how a furniture retailer transformed their Turkish imports with our consolidation services.
                        </p>
                        <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                          Read More →
                        </a>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {/* Blog Post 1 */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="h-48 overflow-hidden">
                    <img src="/placeholder.svg" alt="Blog Post" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-500">May 15, 2023</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-blue-600">Shipping</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Understanding Turkish Export Regulations in 2023</h3>
                    <p className="text-gray-600 mb-4">
                      A comprehensive guide to navigating the complex export regulations for goods leaving Turkey.
                    </p>
                    <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                      Read More →
                    </a>
                  </div>
                </div>
                
                {/* Blog Post 2 */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="h-48 overflow-hidden">
                    <img src="/placeholder.svg" alt="Blog Post" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-500">April 28, 2023</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-blue-600">Consolidation</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">5 Ways to Reduce Shipping Costs with Consolidation</h3>
                    <p className="text-gray-600 mb-4">
                      Learn how businesses are saving up to 40% on shipping costs by implementing strategic consolidation techniques.
                    </p>
                    <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                      Read More →
                    </a>
                  </div>
                </div>
                
                {/* Blog Post 3 */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="h-48 overflow-hidden">
                    <img src="/placeholder.svg" alt="Blog Post" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-500">April 10, 2023</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-blue-600">Success Story</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Case Study: How Company XYZ Optimized Their Supply Chain</h3>
                    <p className="text-gray-600 mb-4">
                      Real-world example of how a furniture retailer transformed their Turkish imports with our consolidation services.
                    </p>
                    <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center">
              <Link to="/blog" className="inline-flex items-center px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                View All Articles
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Updated Pricing Section - Swipeable on Mobile */}
        <section id="pricing" className={`py-16 md:py-20 bg-gray-50 ${isMobile ? "mt-0" : ""}`}>
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
            
            {/* Mobile Pricing Slider Controls */}
            {isMobile && (
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => scrollSlider(pricingSliderRef, 'left')}
                  className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-500">Swipe to see more</span>
                <button 
                  onClick={() => scrollSlider(pricingSliderRef, 'right')}
                  className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {/* Desktop: Grid Layout, Mobile: Horizontal Scroll */}
            <div 
              ref={pricingSliderRef}
              className={`${
                isMobile 
                  ? 'flex overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-6 px-6 pb-4 gap-4'
                  : 'grid grid-cols-1 md:grid-cols-3 gap-8'
              } mb-10`}
            >
              {/* First Trial */}
              <div className={`
                bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden 
                transition-transform hover:-translate-y-1 hover:shadow-md
                ${isMobile ? 'flex-shrink-0 w-[85%] snap-center' : ''}
              `}>
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
              
              <div className={`
                bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden 
                transition-transform hover:-translate-y-1 hover:shadow-md
                ${isMobile ? 'flex-shrink-0 w-[85%] snap-center' : ''}
              `}>
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
              
              <div className={`
                bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden 
                transition-transform hover:-translate-y-1 hover:shadow-md
                ${isMobile ? 'flex-shrink-0 w-[85%] snap-center' : ''}
              `}>
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
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Index;
