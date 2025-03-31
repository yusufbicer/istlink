
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Network, Activity, Zap, TrendingUp, GitMerge, Truck, Package, DollarSign, FileText, BarChart2, Archive, CreditCard } from 'lucide-react';
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
                    
                    {/* Mobile Navigation */}
                    <div className="flex mb-3 bg-gray-50 rounded-lg p-1.5 text-xs justify-between">
                      <div className="px-2 py-1 bg-white shadow-sm rounded flex items-center font-medium text-metallic-blue">
                        <Package className="h-3 w-3 mr-1" /> Consolidations
                      </div>
                      <div className="px-2 py-1 flex items-center text-gray-600">
                        <Truck className="h-3 w-3 mr-1" /> Orders
                      </div>
                      <div className="px-2 py-1 flex items-center text-gray-600">
                        <BarChart2 className="h-3 w-3 mr-1" /> Analytics
                      </div>
                    </div>
                    
                    {/* Payment Status for Mobile - More compact */}
                    <div className="mb-3 bg-green-50 border border-green-200 rounded-lg p-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard className="h-3.5 w-3.5 text-green-600 mr-1.5" />
                          <span className="text-xs font-medium text-gray-700">Payments</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">All Clear</span>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <div>
                          <div className="font-medium">$0 <span className="text-gray-500 text-[10px]">pending</span></div>
                        </div>
                        <div>
                          <div className="font-medium">$24,850 <span className="text-gray-500 text-[10px]">processed</span></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Improved Bento Grid for Mobile */}
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
                          <span className="text-gray-500 text-xs">Active Consolidations</span>
                          <GitMerge className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-lg font-bold">5</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>2 ready to ship</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2 bg-lavender-50 p-3 rounded-xl border border-lavender-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600 text-xs font-medium">Shipping Cost Analysis</span>
                          <Activity className="h-3.5 w-3.5 text-lavender-600" />
                        </div>
                        
                        {/* Improved chart for mobile with data visualization */}
                        <div className="relative h-20 mt-1">
                          {/* Cost comparison bars */}
                          <div className="absolute inset-0 flex items-end justify-around px-1">
                            <div className="flex flex-col items-center justify-end h-full w-[30%]">
                              <div className="w-full bg-gray-200 rounded-t-sm" style={{height: '45%'}}></div>
                              <div className="text-[10px] text-gray-500 mt-1">Standard</div>
                              <div className="text-xs font-medium">$32,500</div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-end h-full w-[30%]">
                              <div className="relative w-full">
                                <div className="w-full bg-metallic-blue rounded-t-sm" style={{height: '80px'}}></div>
                                <div className="absolute top-0 left-0 w-full">
                                  <div className="w-full h-[36px] bg-red-100 opacity-20"></div>
                                </div>
                                {/* Savings indicator */}
                                <div className="absolute -right-2 top-[36px] w-4 h-4 bg-white rounded-full border border-metallic-blue flex items-center justify-center">
                                  <div className="w-2 h-2 bg-metallic-blue rounded-full"></div>
                                </div>
                              </div>
                              <div className="text-[10px] text-gray-500 mt-1">With GROOP</div>
                              <div className="text-xs font-medium">$19,750</div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-end h-full">
                              <div className="text-[10px] text-gray-500">Saved</div>
                              <div className="text-xs font-bold text-green-600">$12,750</div>
                              <div className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-medium mt-1">39%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 text-xs font-medium">Next Shipment</span>
                          <Truck className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                          <div>
                            <div className="text-xs font-medium">Istanbul → Matadi</div>
                            <div className="text-[10px] text-gray-500">Nov 15, 2023</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-medium text-metallic-blue">75% filled</div>
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                              <div className="bg-metallic-blue h-full rounded-full" style={{width: '75%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Improved Desktop Dashboard Layout
                  <div className="bg-white text-gray-800 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-metallic-blue to-metallic-light relative overflow-hidden mr-3">
                          <Zap className="w-5 h-5 text-white absolute" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">GROOP</div>
                          <div className="text-xs text-metallic-blue font-medium">BEYOND BORDERS</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <div className="flex items-center px-3 py-1.5 bg-metallic-blue text-white rounded-lg text-sm font-medium">
                          <Activity className="h-4 w-4 mr-2" /> Dashboard
                        </div>
                        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <Package className="h-4 w-4 mr-2" /> Consolidations
                        </div>
                        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <Truck className="h-4 w-4 mr-2" /> Orders
                        </div>
                        <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <BarChart2 className="h-4 w-4 mr-2" /> Analytics
                        </div>
                        <div className="h-8 w-8 rounded-full bg-lavender-100 flex items-center justify-center text-sm font-medium text-lavender-700">
                          JD
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Status - More compact and organized */}
                    <div className="flex gap-3 mb-3">
                      <div className="flex-grow bg-green-50 rounded-xl border border-green-200 p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 text-green-600 mr-2" />
                            <span className="font-medium text-gray-700">Payment Status</span>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">All Payments Cleared</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-sm text-gray-500">Pending</div>
                            <div className="text-lg font-bold mt-1">$0</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-sm text-gray-500">Processed</div>
                            <div className="text-lg font-bold mt-1">$24,850</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-sm text-gray-500">Upcoming</div>
                            <div className="text-lg font-bold mt-1">$7,230</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Improved Desktop Bento Grid Layout */}
                    <div className="grid grid-cols-12 gap-3">
                      {/* Top Row - Key Metrics */}
                      <div className="col-span-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-sm">Active Orders</span>
                          <Package className="h-4 w-4 text-metallic-blue" />
                        </div>
                        <div className="text-2xl font-bold">28</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+5 since last week</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-sm">Active Consolidations</span>
                          <GitMerge className="h-4 w-4 text-metallic-blue" />
                        </div>
                        <div className="text-2xl font-bold">5</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>2 ready to ship</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-sm">Utilization</span>
                          <Truck className="h-4 w-4 text-metallic-blue" />
                        </div>
                        <div className="text-2xl font-bold">92%</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+8% improved</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500 text-sm">Total Savings</span>
                          <DollarSign className="h-4 w-4 text-metallic-blue" />
                        </div>
                        <div className="text-2xl font-bold">$85,750</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>35% average</span>
                        </div>
                      </div>
                      
                      {/* Middle Row - Shipping Cost Analysis */}
                      <div className="col-span-7 bg-lavender-50 p-4 rounded-xl border border-lavender-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-gray-700">Shipping Cost Analysis</span>
                          <div className="flex space-x-2">
                            <div className="px-2 py-1 bg-lavender-100 text-lavender-700 rounded text-xs font-medium">Monthly</div>
                            <div className="px-2 py-1 bg-white text-gray-500 rounded text-xs">Quarterly</div>
                          </div>
                        </div>
                        
                        {/* Improved chart with direct cost comparison visualization */}
                        <div className="h-40 relative">
                          <div className="flex justify-between items-end h-full p-2">
                            {/* Standard Shipping Cost */}
                            <div className="flex flex-col items-center space-y-2 w-1/3">
                              <div className="w-full h-28 flex justify-center items-end">
                                <div className="w-24 bg-gray-300 rounded-t relative" style={{height: '70%'}}>
                                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white rounded shadow-sm text-xs font-medium">
                                    $32,500
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">Standard Shipping</div>
                            </div>
                            
                            {/* GROOP Consolidation */}
                            <div className="flex flex-col items-center space-y-2 w-1/3">
                              <div className="w-full h-28 flex justify-center items-end">
                                <div className="w-24 bg-metallic-blue rounded-t relative" style={{height: '40%'}}>
                                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white rounded shadow-sm text-xs font-medium text-metallic-blue">
                                    $19,750
                                  </div>
                                  {/* Savings indicator */}
                                  <div className="absolute -right-3 top-[calc(100%+15px)] w-6 h-6 bg-white rounded-full shadow border-2 border-green-500 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  </div>
                                  {/* Connecting line */}
                                  <div className="absolute top-0 right-0 h-[calc(100%+15px)] w-0.5 bg-dashed bg-green-200"></div>
                                </div>
                              </div>
                              <div className="text-sm font-medium text-metallic-blue">GROOP Consolidation</div>
                            </div>
                            
                            {/* Savings */}
                            <div className="flex flex-col items-center space-y-2 w-1/3">
                              <div className="flex flex-col items-center justify-center h-28">
                                <div className="text-3xl font-bold text-green-600">$12,750</div>
                                <div className="text-lg font-semibold text-green-600">Saved</div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium mt-2">
                                  39% reduction
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">Total Monthly Savings</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Side - Next Shipment and Active Consolidations */}
                      <div className="col-span-5 grid grid-rows-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700">Efficiency Metrics</span>
                            <Activity className="h-4 w-4 text-metallic-blue" />
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Space Utilization</span>
                                <span className="font-medium">92%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-metallic-blue h-full rounded-full" style={{width: '92%'}}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Cost Savings</span>
                                <span className="font-medium">35%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-green-500 h-full rounded-full" style={{width: '35%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Next Shipment with Matadi destination */}
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="font-medium text-gray-700 mb-2">Next Shipment</div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex justify-between">
                              <div>
                                <div className="text-sm font-medium">Istanbul → Matadi</div>
                                <div className="text-xs text-gray-500">Departure: Nov 15, 2023</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-metallic-blue">28 Orders</div>
                                <div className="text-xs text-gray-500">3 Suppliers</div>
                              </div>
                            </div>
                            <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                              <div className="bg-metallic-blue h-full rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <div className="mt-1 text-xs text-right text-gray-500">75% Filled</div>
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
