
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Network, Activity, Zap, TrendingUp, GitMerge, Truck, Package, DollarSign, FileText } from 'lucide-react';
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
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative bg-gradient-to-b from-lavender-50 to-white">
      {/* Background gradients and effects */}
      <div className="absolute inset-0 bg-gradient-radial from-lavender-100/70 via-transparent to-transparent opacity-80" />
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-lavender-200 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-lavender-100 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
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
        
        {/* Bento Grid Dashboard Preview */}
        <div 
          className={`mt-8 relative mx-auto max-w-5xl transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
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
                  <div className="bg-white text-gray-800 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-9 w-9 rounded-md bg-gradient-to-r from-metallic-blue to-metallic-light relative overflow-hidden">
                          <Zap className="w-5 h-5 text-white absolute" />
                        </div>
                        <div className="ml-2">
                          <div className="font-bold text-gray-900 text-sm">GROOP</div>
                          <div className="text-xs text-metallic-blue">BEYOND BORDERS</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-xs font-medium px-2 py-1 bg-lavender-100 text-metallic-blue rounded-full">Dashboard</div>
                      </div>
                    </div>
                    
                    {/* Bento Grid for Mobile */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-500 text-xs">Active Orders</span>
                          <Package className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-xl font-bold">28</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+5 this week</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-500 text-xs">Consolidations</span>
                          <GitMerge className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="text-xl font-bold">5</div>
                        <div className="flex items-center mt-1 text-green-500 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>2 ready</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2 bg-lavender-50 p-3 rounded-xl border border-lavender-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 text-xs font-medium">This Month Savings</span>
                          <DollarSign className="h-3.5 w-3.5 text-lavender-600" />
                        </div>
                        <div className="text-2xl font-bold text-lavender-700">$12,750</div>
                        <div className="w-full bg-lavender-200 h-2 rounded-full mt-2 overflow-hidden">
                          <div className="bg-lavender-500 h-full rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-gray-500">35% saved on shipping</span>
                          <span className="text-lavender-600 font-medium">+8% vs last month</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 text-xs font-medium">Active Consolidations</span>
                          <Activity className="h-3.5 w-3.5 text-metallic-blue" />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <span className="text-xs">CON-2023-1458</span>
                            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-green-100 text-green-700">Ready</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <span className="text-xs">CON-2023-1457</span>
                            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-blue-100 text-blue-700">In Progress</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Desktop Bento Grid Layout
                  <div className="bg-white text-gray-800 p-6">
                    <div className="flex items-center justify-between mb-6">
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
                        <div className="flex items-center px-4 py-2 bg-metallic-blue text-white rounded-lg text-sm font-medium">
                          <Activity className="h-4 w-4 mr-2" /> Dashboard
                        </div>
                        <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <Package className="h-4 w-4 mr-2" /> Orders
                        </div>
                        <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium">
                          <GitMerge className="h-4 w-4 mr-2" /> Consolidations
                        </div>
                        <div className="h-8 w-8 rounded-full bg-lavender-100 flex items-center justify-center text-sm font-medium text-lavender-700">
                          JD
                        </div>
                      </div>
                    </div>
                    
                    {/* Bento Grid Layout for Desktop */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Top Row - 3 Main Metrics */}
                      <div className="col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-500">Active Orders</span>
                          <Package className="h-5 w-5 text-metallic-blue" />
                        </div>
                        <div className="text-3xl font-bold">28</div>
                        <div className="flex items-center mt-2 text-green-500 text-sm">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>+5 since last week</span>
                        </div>
                      </div>
                      
                      <div className="col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-500">Consolidations</span>
                          <GitMerge className="h-5 w-5 text-metallic-blue" />
                        </div>
                        <div className="text-3xl font-bold">5</div>
                        <div className="flex items-center mt-2 text-green-500 text-sm">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>2 ready to ship</span>
                        </div>
                      </div>
                      
                      <div className="col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-500">Utilization Rate</span>
                          <Truck className="h-5 w-5 text-metallic-blue" />
                        </div>
                        <div className="text-3xl font-bold">92%</div>
                        <div className="flex items-center mt-2 text-green-500 text-sm">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>+8% improved efficiency</span>
                        </div>
                      </div>
                      
                      {/* Middle Row - Main Dashboard and Efficiency */}
                      <div className="col-span-8 bg-lavender-50 p-4 rounded-xl border border-lavender-200 row-span-2">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium text-gray-700">Shipping Cost Analysis</span>
                          <div className="flex space-x-2">
                            <div className="px-2 py-1 bg-lavender-100 text-lavender-700 rounded text-xs font-medium">Monthly</div>
                            <div className="px-2 py-1 bg-white text-gray-500 rounded text-xs">Quarterly</div>
                          </div>
                        </div>
                        
                        {/* Chart representation */}
                        <div className="h-40 relative">
                          <div className="absolute left-0 right-0 bottom-0 h-[70%]">
                            {/* Simulated bar chart */}
                            <div className="flex items-end h-full justify-between px-2">
                              {[35, 42, 56, 60, 75, 90, 82, 65, 70, 55, 45, 40].map((height, i) => (
                                <div key={i} className="w-[5%] mx-1">
                                  <div 
                                    className={`${i === 6 ? 'bg-metallic-blue' : 'bg-lavender-300'} rounded-t-sm`}
                                    style={{height: `${height}%`}}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Annotation */}
                          <div className="absolute right-1/3 top-[30%] bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-xs">
                            <div className="font-medium text-gray-800">Oct 15, 2023</div>
                            <div className="text-metallic-blue font-medium">$8,750 saved</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center p-3 bg-white rounded-lg border border-lavender-100">
                          <div>
                            <div className="text-sm text-gray-500">Total Savings This Year</div>
                            <div className="text-2xl font-bold text-gray-900">$85,750</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Average per Shipment</div>
                            <div className="text-2xl font-bold text-metallic-blue">35%</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Efficiency Improvement</div>
                            <div className="text-2xl font-bold text-green-500">+22%</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
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
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-500">Documentation Time</span>
                              <span className="font-medium">68%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                              <div className="bg-lavender-500 h-full rounded-full" style={{width: '68%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Row */}
                      <div className="col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-gray-700">Active Consolidations</span>
                          <GitMerge className="h-4 w-4 text-metallic-blue" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <span className="text-sm">CON-2023-1458</span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">Ready to Ship</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <span className="text-sm">CON-2023-1457</span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">Consolidating</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                            <span className="text-sm">CON-2023-1456</span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">Payments</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-gray-700">Account Balance</span>
                          <DollarSign className="h-4 w-4 text-metallic-blue" />
                        </div>
                        
                        <div className="text-3xl font-bold text-gray-900 mb-3">$69,000</div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Value:</span>
                            <span className="font-medium">$185,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Paid to Suppliers:</span>
                            <span className="font-medium text-green-500">$112,300</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Service Fee (2%):</span>
                            <span className="font-medium text-metallic-blue">$3,700</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-gray-700">Upcoming Shipments</span>
                          <FileText className="h-4 w-4 text-metallic-blue" />
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-sm font-medium">Istanbul → Rotterdam</div>
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
