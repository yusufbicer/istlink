
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Network, Activity, Zap, TrendingUp, GitMerge, Truck, Package, DollarSign, FileText, BarChart2, Archive, CreditCard, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden relative bg-gradient-to-b from-lavender-50 to-white">
      {/* Background gradients and effects */}
      <div className="absolute inset-0 bg-gradient-radial from-lavender-100/70 via-transparent to-transparent opacity-80" />
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-lavender-200 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-lavender-100 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block py-1 px-3 text-sm font-medium bg-lavender-100 text-metallic-blue rounded-full mb-4">
              Smart Consolidation Solutions
            </span>
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 transition-all duration-1000 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Turkish Supply Chain Complexity, <span className="bg-clip-text text-transparent bg-gradient-to-r from-metallic-blue to-lavender-500">Elegantly Resolved</span>
          </h1>
          
          <p 
            className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Transform fragmented Turkish supplier purchases into a single, streamlined shipment. 
            Our AI-powered platform simplifies the entire process—from payment consolidation to 
            documentation management and comprehensive tracking.
          </p>
          
          <div 
            className={`flex justify-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button asChild size="lg" className="h-12 px-8 text-md bg-metallic-blue hover:bg-metallic-dark text-white">
              <a href="https://calendly.com/yourusername" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" /> Talk to Our Team
              </a>
            </Button>
          </div>
        </div>
        
        {/* Bento Grid Dashboard Preview - More compact */}
        <div 
          className={`mt-4 relative mx-auto max-w-4xl transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <div className="bg-gradient-to-r from-metallic-blue to-lavender-500 p-0.5 rounded-xl">
              <div className="rounded-xl overflow-hidden bg-white border-0">
                {/* Browser chrome bar */}
                <div className="relative bg-gray-100 px-2 pt-2 pb-1 flex items-center rounded-t-xl">
                  <div className="flex space-x-1.5 absolute left-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto">
                    <div className="h-4 w-64 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                {isMobile ? (
                  // Mobile Dashboard Layout - Shorter and more concise
                  <div className="bg-white text-gray-800 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-9 w-9 rounded-md bg-gradient-to-r from-metallic-blue to-metallic-light relative overflow-hidden">
                          <Zap className="w-5 h-5 text-white absolute" />
                        </div>
                        <div className="ml-2">
                          <div className="font-bold text-gray-900 text-sm">GROOP</div>
                          <div className="text-xs text-metallic-blue">BEYOND BORDERS</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex items-center px-2 py-1 bg-metallic-blue text-white rounded-md text-xs font-medium">
                          <Activity className="h-3 w-3 mr-1" /> Dashboard
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Navigation - Updated with 5 items */}
                    <div className="flex mb-3 bg-gray-50 rounded-lg p-1.5 text-xs justify-between overflow-x-auto">
                      <div className="px-2 py-1 bg-white shadow-sm rounded flex items-center font-medium text-metallic-blue flex-shrink-0">
                        <Activity className="h-3 w-3 mr-1" /> Dashboard
                      </div>
                      <div className="px-2 py-1 flex items-center text-gray-600 flex-shrink-0">
                        <Truck className="h-3 w-3 mr-1" /> Orders
                      </div>
                      <div className="px-2 py-1 flex items-center text-gray-600 flex-shrink-0">
                        <Package className="h-3 w-3 mr-1" /> Consol
                      </div>
                      <div className="px-2 py-1 flex items-center text-gray-600 flex-shrink-0">
                        <Users className="h-3 w-3 mr-1" /> Supplier
                      </div>
                      <div className="px-2 py-1 flex items-center text-gray-600 flex-shrink-0">
                        <BarChart2 className="h-3 w-3 mr-1" /> Analytics
                      </div>
                    </div>
                    
                    {/* Mobile Grid Layout */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-xs">Active Orders</span>
                          <Package className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-lg font-bold">28</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+5 this week</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-xs">Consolidations</span>
                          <GitMerge className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-lg font-bold">5</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>2 ready to ship</span>
                        </div>
                      </div>
                      
                      {/* Smaller Shipping Cost Analysis */}
                      <div className="bg-lavender-50 p-2 rounded-xl border border-lavender-200">
                        <div className="text-gray-600 text-xs">Cost Analysis</div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="w-6 h-12 bg-gray-300 rounded-sm"></div>
                          <div className="w-6 h-12 bg-metallic-blue rounded-sm relative" style={{height: '8px'}}>
                            <div className="absolute -top-3 -right-1 text-[8px] font-medium">-39%</div>
                          </div>
                          <div className="text-xs font-bold text-green-600">$12,750 <span className="block text-[8px]">saved</span></div>
                        </div>
                      </div>
                      
                      {/* Payment Status - Bottom Right */}
                      <div className="bg-green-50 p-2 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-600">Payments</div>
                          <div className="text-[8px] px-1 py-0.5 rounded-full bg-green-100 text-green-700">Clear</div>
                        </div>
                        <div className="text-sm font-bold mt-1">$24,850</div>
                        <div className="text-[8px] text-gray-500">processed</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Improved Desktop Dashboard Layout
                  <div className="bg-white text-gray-800 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-9 w-9 rounded-md bg-gradient-to-r from-metallic-blue to-metallic-light relative overflow-hidden mr-3">
                          <Zap className="w-5 h-5 text-white absolute" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">GROOP</div>
                          <div className="text-xs text-metallic-blue font-medium">BEYOND BORDERS</div>
                        </div>
                      </div>
                      
                      {/* Updated Navigation with 5 items in order */}
                      <div className="flex space-x-2">
                        <div className="flex items-center px-3 py-1.5 bg-metallic-blue text-white rounded-lg text-sm font-medium">
                          <Activity className="h-3.5 w-3.5 mr-1.5" /> Dashboard
                        </div>
                        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <Truck className="h-3.5 w-3.5 mr-1.5" /> Orders
                        </div>
                        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <Package className="h-3.5 w-3.5 mr-1.5" /> Consolidations
                        </div>
                        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <Users className="h-3.5 w-3.5 mr-1.5" /> Supplier
                        </div>
                        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <BarChart2 className="h-3.5 w-3.5 mr-1.5" /> Analytics
                        </div>
                        <div className="h-8 w-8 rounded-full bg-lavender-100 flex items-center justify-center text-sm font-medium text-lavender-700">
                          JD
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Dashboard Content - Redesigned layout */}
                    <div className="grid grid-cols-12 gap-3">
                      {/* Top Row - Key Metrics */}
                      <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-xs">Active Orders</span>
                          <Package className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-xl font-bold">28</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+5 this week</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-xs">Consolidations</span>
                          <GitMerge className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-xl font-bold">5</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>2 ready to ship</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-xs">Utilization</span>
                          <Truck className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-xl font-bold">92%</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+8% improved</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-xs">Total Savings</span>
                          <DollarSign className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-xl font-bold">$85,750</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>35% average</span>
                        </div>
                      </div>
                      
                      {/* Payment Status - Now in bottom right */}
                      <div className="col-span-4 bg-green-50 p-3 rounded-xl border border-green-200">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <CreditCard className="h-3.5 w-3.5 text-green-600 mr-1.5" />
                            <span className="text-sm font-medium text-gray-700">Payment Status</span>
                          </div>
                          <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">All Clear</span>
                        </div>
                        <div className="mt-1 grid grid-cols-3 gap-2">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Pending</div>
                            <div className="text-sm font-bold">$0</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Processed</div>
                            <div className="text-sm font-bold">$24,850</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Upcoming</div>
                            <div className="text-sm font-bold">$7,230</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* More Compact Shipping Cost Analysis */}
                      <div className="col-span-6 bg-lavender-50 p-3 rounded-xl border border-lavender-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Shipping Cost Analysis</span>
                          <div className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">39% Saved</div>
                        </div>
                        
                        {/* Simplified cost comparison chart */}
                        <div className="flex items-end h-16 justify-between px-3">
                          <div className="flex flex-col items-center">
                            <div className="h-full flex items-end">
                              <div className="w-10 bg-gray-300 rounded-t" style={{height: '100%'}}></div>
                            </div>
                            <div className="text-xs mt-1 text-gray-500">Standard</div>
                            <div className="text-xs font-medium">$32,500</div>
                          </div>
                          
                          <div className="h-full flex items-end">
                            <div className="flex flex-col items-center">
                              <div className="w-10 bg-metallic-blue rounded-t" style={{height: '62%'}}></div>
                              <div className="text-xs mt-1 text-gray-500">With GROOP</div>
                              <div className="text-xs font-medium">$19,750</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center justify-end h-full">
                            <div className="text-sm font-bold text-green-600">$12,750</div>
                            <div className="text-xs text-gray-500">Total Saved</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Active Consolidations */}
                      <div className="col-span-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="text-sm font-medium text-gray-700 mb-2">Active Consolidations</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white p-2 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center">
                              <div className="text-xs font-medium">Istanbul → Matadi</div>
                              <div className="text-xs text-green-600">75% filled</div>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                              <div className="bg-metallic-blue h-full rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1">Nov 15, 2023 • 28 orders</div>
                          </div>
                          
                          <div className="bg-white p-2 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center">
                              <div className="text-xs font-medium">Istanbul → Lagos</div>
                              <div className="text-xs text-amber-600">45% filled</div>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                              <div className="bg-metallic-blue h-full rounded-full" style={{width: '45%'}}></div>
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1">Dec 5, 2023 • 14 orders</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
