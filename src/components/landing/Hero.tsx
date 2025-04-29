
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Network, Activity, Zap, TrendingUp, GitMerge, Truck, Package, Users, BarChart2, Archive, CreditCard, Timer, Database } from 'lucide-react';
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
    <section className="pt-28 pb-8 md:pt-36 md:pb-16 overflow-hidden relative bg-gradient-to-b from-lavender-50 to-white">
      {/* Background gradients and effects */}
      <div className="absolute inset-0 bg-gradient-radial from-lavender-100/70 via-transparent to-transparent opacity-80" />
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-lavender-200 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-lavender-100 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block py-1 px-3 text-sm font-medium bg-lavender-100 text-metallic-blue rounded-full mb-3">
              Smart Consolidation Solutions
            </span>
          </div>
          
          <h1 
            className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight mb-5 transition-all duration-1000 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Turkish Supply Chain Complexity, <span className="bg-clip-text text-transparent bg-gradient-to-r from-metallic-blue to-lavender-500">Elegantly Resolved</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
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
              <a href="https://cal.com/yusuf-bicer-8ytuyg" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" /> Talk to Our Team
              </a>
            </Button>
          </div>
        
          <div 
            className={`mt-2 md:mt-4 relative mx-auto max-w-4xl transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <div className="bg-gradient-to-r from-metallic-blue to-lavender-500 p-0.5 rounded-xl">
                <div className="rounded-xl overflow-hidden bg-white border-0">
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
                  
                  {isMobile ? (
                    <div className="bg-white text-gray-800 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-r from-metallic-blue to-metallic-light relative overflow-hidden mr-3">
                            <Zap className="w-4 h-4 text-white absolute" />
                          </div>
                          <span className="font-bold text-base">GROOP</span>
                        </div>
                      </div>
                      
                      {/* Mobile navigation bar with Orders, Consolidations, Suppliers, Analytics */}
                      <div className="flex mb-3 bg-gray-200 rounded-lg p-1.5 text-xs justify-between overflow-x-auto whitespace-nowrap shadow-sm">
                        <div className="px-2.5 py-1.5 flex items-center text-gray-700 hover:bg-white/80 hover:text-metallic-blue rounded-md transition-colors">
                          <Package className="h-3.5 w-3.5 mr-1" /> Orders
                        </div>
                        <div className="px-2.5 py-1.5 flex items-center text-gray-700 hover:bg-white/80 hover:text-metallic-blue rounded-md transition-colors">
                          <GitMerge className="h-3.5 w-3.5 mr-1" /> Consolidations
                        </div>
                        <div className="px-2.5 py-1.5 flex items-center text-gray-700 hover:bg-white/80 hover:text-metallic-blue rounded-md transition-colors">
                          <Users className="h-3.5 w-3.5 mr-1" /> Suppliers
                        </div>
                        <div className="px-2.5 py-1.5 flex items-center text-gray-700 hover:bg-white/80 hover:text-metallic-blue rounded-md transition-colors">
                          <BarChart2 className="h-3.5 w-3.5 mr-1" /> Analytics
                        </div>
                        <div className="ml-1 w-7 h-7 rounded-full bg-lavender-100 flex items-center justify-center text-xs text-lavender-700 font-medium">
                          JD
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-medium">Active Orders</span>
                            <Package className="h-3 w-3 text-metallic-blue" />
                          </div>
                          <div className="text-sm font-bold">28</div>
                          <div className="flex items-center mt-1 text-green-600 text-[10px]">
                            <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                            <span>+5 this week</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-medium">Active Consolidations</span>
                            <GitMerge className="h-3 w-3 text-metallic-blue" />
                          </div>
                          <div className="text-sm font-bold">5</div>
                          <div className="flex items-center mt-1 text-green-600 text-[10px]">
                            <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                            <span>2 ready to ship</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-medium">Space Utilization</span>
                            <Truck className="h-3 w-3 text-metallic-blue" />
                          </div>
                          <div className="text-sm font-bold">92%</div>
                        </div>
                        
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-medium">Time Saved</span>
                            <Timer className="h-3 w-3 text-metallic-blue" />
                          </div>
                          <div className="text-sm font-bold">68%</div>
                        </div>
                        
                        <div className="col-span-2 bg-lavender-100 p-2 rounded-lg border border-lavender-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-semibold">Shipping Cost Analysis</span>
                            <Activity className="h-3 w-3 text-lavender-600" />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1 text-center">
                            <div className="px-1 py-1 bg-white rounded border border-gray-200">
                              <div className="text-[9px] text-gray-600">Standard</div>
                              <div className="text-xs font-bold">$32.5K</div>
                            </div>
                            <div className="px-1 py-1 bg-white rounded border border-gray-200">
                              <div className="text-[9px] text-gray-600">GROOP</div>
                              <div className="text-xs font-bold text-metallic-blue">$19.7K</div>
                            </div>
                            <div className="px-1 py-1 bg-white rounded border border-gray-200">
                              <div className="text-[9px] text-gray-600">Saved</div>
                              <div className="text-xs font-bold text-green-600">$12.7K</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-2 bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-semibold">Active Consolidations</span>
                            <GitMerge className="h-3 w-3 text-metallic-blue" />
                          </div>
                          <div className="space-y-1.5">
                            <div className="bg-white p-1.5 rounded border border-gray-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-[10px] font-medium">Istanbul → Lagos</div>
                                  <div className="text-[8px] text-gray-600">Apr 15, 2025</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[10px] font-medium text-metallic-blue">95%</div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white p-1.5 rounded border border-gray-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-[10px] font-medium">Istanbul → Matadi</div>
                                  <div className="text-[8px] text-gray-600">Apr 25, 2025</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[10px] font-medium text-metallic-blue">75%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-gray-200 rounded-lg border border-gray-300 p-2 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <CreditCard className="h-3 w-3 text-metallic-blue mr-1" />
                            <span className="text-[10px] font-medium">Payment Status</span>
                          </div>
                          <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[8px] rounded-full font-medium">Active</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="bg-white p-1.5 rounded shadow-sm">
                            <div className="text-[8px] text-gray-600">Available</div>
                            <div className="text-[10px] font-medium">$32,080</div>
                          </div>
                          <div className="bg-white p-1.5 rounded shadow-sm">
                            <div className="text-[8px] text-gray-600">To Suppliers</div>
                            <div className="text-[10px] font-medium">$24,850</div>
                          </div>
                          <div className="bg-white p-1.5 rounded shadow-sm">
                            <div className="text-[8px] text-gray-600">Service (2%)</div>
                            <div className="text-[10px] font-medium">$497</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white text-gray-800 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-metallic-blue to-metallic-light relative overflow-hidden mr-4">
                            <Zap className="w-5 h-5 text-white absolute" />
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <div className="flex items-center px-3 py-1.5 bg-metallic-blue text-white rounded-lg text-sm font-medium">
                            <Activity className="h-4 w-4 mr-2" /> Dashboard
                          </div>
                          <div className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium">
                            <Package className="h-4 w-4 mr-2" /> Orders
                          </div>
                          <div className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium">
                            <GitMerge className="h-4 w-4 mr-2" /> Consolidations
                          </div>
                          <div className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium">
                            <Users className="h-4 w-4 mr-2" /> Suppliers
                          </div>
                          <div className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium">
                            <BarChart2 className="h-4 w-4 mr-0" /> Analytics
                          </div>
                          <div className="h-8 w-8 rounded-full bg-lavender-100 flex items-center justify-center text-sm font-medium text-lavender-700">
                            JD
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-3">
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
                            <span className="text-gray-500 text-sm">Space Utilization</span>
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
                            <span className="text-gray-500 text-sm">Time Saved</span>
                            <Timer className="h-4 w-4 text-metallic-blue" />
                          </div>
                          <div className="text-2xl font-bold">68%</div>
                          <div className="flex items-center mt-1 text-green-500 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+12% this month</span>
                          </div>
                        </div>
                        
                        <div className="col-span-6 bg-lavender-50 p-4 rounded-xl border border-lavender-200">
                          <div className="flex justify-between items-center mb-3">
                            <div className="font-medium text-gray-700 flex items-center">
                              <Activity className="h-4 w-4 text-lavender-600 mr-2" />
                              Shipping Cost Analysis
                            </div>
                            <div className="flex space-x-2">
                              <div className="px-2 py-1 bg-lavender-100 text-lavender-700 rounded text-xs font-medium">Monthly</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm w-full">
                              <div className="text-sm text-gray-500 mb-1">Standard Shipping</div>
                              <div className="text-xl font-bold">$32,500</div>
                            </div>
                            
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm border-l-4 border-metallic-blue w-full">
                              <div className="text-sm text-metallic-blue mb-1">GROOP Consolidation</div>
                              <div className="text-xl font-bold text-metallic-blue">$19,750</div>
                            </div>
                            
                            <div className="text-center p-2 bg-green-50 rounded-lg shadow-sm w-full">
                              <div className="text-sm text-green-600 mb-1">Total Savings</div>
                              <div className="text-xl font-bold text-green-600">$12,750</div>
                              <div className="text-xs font-medium text-green-600">39% reduction</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700">Efficiency Metrics</span>
                            <Activity className="h-4 w-4 text-metallic-blue" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
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
                                <span className="font-medium">39%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-green-500 h-full rounded-full" style={{width: '39%'}}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Time Saved</span>
                                <span className="font-medium">68%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-lavender-500 h-full rounded-full" style={{width: '68%'}}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Documentation</span>
                                <span className="font-medium">78%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-amber-500 h-full rounded-full" style={{width: '78%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="font-medium text-gray-700 mb-2 flex items-center">
                            <GitMerge className="h-4 w-4 mr-2 text-metallic-blue" />
                            Active Consolidations
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex justify-between">
                                <div>
                                  <div className="text-sm font-medium">Istanbul → Lagos</div>
                                  <div className="text-xs text-gray-500">Apr 10, 2025</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-metallic-blue">9 Orders</div>
                                  <div className="text-xs text-gray-500">4 Suppliers</div>
                                </div>
                              </div>
                              <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                                <div className="bg-green-500 h-full rounded-full" style={{width: '95%'}}></div>
                              </div>
                              <div className="mt-1 text-xs text-right text-gray-500">95% Filled</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex justify-between">
                                <div>
                                  <div className="text-sm font-medium">Istanbul → Matadi</div>
                                  <div className="text-xs text-gray-500">Apr 15, 2025</div>
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
                        
                        <div className="col-span-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="font-medium text-gray-700 mb-2 flex items-center">
                            <Truck className="h-4 w-4 mr-2 text-metallic-blue" />
                            Next Shipment
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="h-12 w-12 bg-lavender-100 rounded-lg flex items-center justify-center">
                                <Truck className="h-6 w-6 text-metallic-blue" />
                              </div>
                              <div>
                                <div className="text-lg font-medium">Istanbul → Matadi</div>
                                <div className="text-sm text-gray-500">Container: 40ft High Cube</div>
                              </div>
                              <div className="ml-auto text-right">
                                <div className="text-sm font-medium">Departure</div>
                                <div className="text-base text-metallic-blue font-bold">Apr 15, 2025</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3 mb-3">
                              <div className="text-center p-2 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-500">Orders</div>
                                <div className="text-lg font-semibold">28</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-500">Suppliers</div>
                                <div className="text-lg font-semibold">3</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-500">Items</div>
                                <div className="text-lg font-semibold">312</div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Container Space</span>
                                <span className="font-medium">75% Filled</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-metallic-blue h-full rounded-full" style={{width: '75%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-12 bg-gray-50 rounded-xl border border-gray-200 p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 text-metallic-blue mr-2" />
                              <span className="font-medium text-gray-700">Payment Status</span>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Active Account</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <div className="bg-white rounded-lg p-2">
                              <div className="text-sm text-gray-500">Available Balance</div>
                              <div className="text-lg font-bold mt-1">$32,080</div>
                            </div>
                            <div className="bg-white rounded-lg p-2">
                              <div className="text-sm text-gray-500">Paid to Suppliers</div>
                              <div className="text-lg font-bold mt-1">$24,850</div>
                            </div>
                            <div className="bg-white rounded-lg p-2">
                              <div className="text-sm text-gray-500">Upcoming Payments</div>
                              <div className="text-lg font-bold mt-1">$7,230</div>
                            </div>
                            <div className="bg-white rounded-lg p-2">
                              <div className="text-sm text-gray-500">Service Fee (2%)</div>
                              <div className="text-lg font-bold mt-1 text-metallic-blue">$497</div>
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
      </div>
    </section>
  );
};

export default Hero;
