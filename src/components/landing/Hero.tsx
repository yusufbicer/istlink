import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from '@/lib/auth';
import { MessageSquare, Network, Activity, TrendingUp, GitMerge, Truck, Package, Users, BarChart2, Archive, CreditCard, Timer, Database } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import IstLinqLogo from '@/components/common/IstLinqLogo';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const isMobile = useIsMobile();

  const alternatingTexts = [
    "Simplified & Streamlined",
    "Elegantly Resolved"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % alternatingTexts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-8 md:pt-32 md:pb-16 overflow-hidden relative bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced background gradients and effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-100/40 via-transparent to-transparent opacity-60" />
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-blue-200 to-lavender-200 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full filter blur-3xl opacity-15 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center mb-6 md:mb-10">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block py-2 px-4 text-xs md:text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4 md:mb-6 border border-blue-200 shadow-sm">
              ✨ Smart Export Consolidation Solutions
            </span>
          </div>
          
          <h1 
            className={`text-xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold md:font-normal leading-tight mb-3 md:mb-4 transition-all duration-1000 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } text-gray-900`}
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <span className="block mb-2">
              Turkish Supply Chain Complexity,
            </span>
            <span className="block relative h-8 md:h-12 lg:h-16 xl:h-20 overflow-hidden">
              <span 
                className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent font-semibold md:font-medium transition-all duration-700 ease-in-out ${
                  currentTextIndex === 0 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}
              >
                {alternatingTexts[0]}
              </span>
              <span 
                className={`absolute inset-0 bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent font-semibold md:font-medium transition-all duration-700 ease-in-out ${
                  currentTextIndex === 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                }`}
              >
                {alternatingTexts[1]}
              </span>
            </span>
          </h1>
          
          <div 
            className={`text-sm md:text-lg lg:text-xl mb-4 md:mb-6 max-w-4xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-black font-medium leading-relaxed px-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Transform fragmented Turkish supplier purchases into a{' '}
              <span className="text-blue-700 font-semibold bg-blue-50 px-1 py-0.5 rounded">single, streamlined shipment</span>. 
              Our AI-powered platform simplifies the entire process—from{' '}
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 py-0.5 rounded">payment consolidation</span>{' '}
              to{' '}
              <span className="text-purple-700 font-semibold bg-purple-50 px-1 py-0.5 rounded">documentation management</span>{' '}
              and comprehensive tracking.
            </p>
          </div>
          
          <div 
            className={`flex justify-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button asChild size="default" className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg">
              <a href="https://cal.com/yusuf-bicer-8ytuyg" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" /> Talk to Our Team
              </a>
            </Button>
          </div>
        
          
          <div 
            className={`mt-6 md:mt-8 relative mx-auto max-w-4xl transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-lavender-500 p-0.5 rounded-xl">
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
                          <IstLinqLogo size="sm" className="mr-3" />
                          <span className="font-bold text-base tracking-tight">istLinq</span>
                        </div>
                      </div>
                      
                      {/* Mobile navigation bar with Orders, Consolidations, Suppliers, Analytics */}
                      <div className="flex mb-3 bg-gray-200 rounded-lg p-0.5 text-[8px] justify-between overflow-hidden whitespace-nowrap shadow-sm">
                        <div className="px-1 py-1 flex items-center text-gray-700 hover:bg-white/80 hover:text-blue-600 rounded-md transition-colors flex-shrink-0 min-w-0">
                          <Package className="h-2 w-2 mr-0.5" /> 
                          <span className="truncate">Orders</span>
                        </div>
                        <div className="px-1 py-1 flex items-center text-gray-700 hover:bg-white/80 hover:text-blue-600 rounded-md transition-colors flex-shrink-0 min-w-0">
                          <GitMerge className="h-2 w-2 mr-0.5" /> 
                          <span className="truncate">Consol</span>
                        </div>
                        <div className="px-1 py-1 flex items-center text-gray-700 hover:bg-white/80 hover:text-blue-600 rounded-md transition-colors flex-shrink-0 min-w-0">
                          <Users className="h-2 w-2 mr-0.5" /> 
                          <span className="truncate">Supply</span>
                        </div>
                        <div className="px-1 py-1 flex items-center text-gray-700 hover:bg-white/80 hover:text-blue-600 rounded-md transition-colors flex-shrink-0 min-w-0">
                          <BarChart2 className="h-2 w-2 mr-0.5" /> 
                          <span className="truncate">Stats</span>
                        </div>
                        <div className="ml-1 w-4 h-4 rounded-full bg-lavender-100 flex items-center justify-center text-[7px] text-lavender-700 font-medium flex-shrink-0">
                          JD
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-medium">Active Orders</span>
                            <Package className="h-3 w-3 text-blue-600" />
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
                            <GitMerge className="h-3 w-3 text-blue-600" />
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
                            <Truck className="h-3 w-3 text-blue-600" />
                          </div>
                          <div className="text-sm font-bold">92%</div>
                        </div>
                        
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 text-[10px] font-medium">Time Saved</span>
                            <Timer className="h-3 w-3 text-blue-600" />
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
                              <div className="text-[9px] text-gray-600">istLinq</div>
                              <div className="text-xs font-bold text-blue-600">$19.7K</div>
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
                            <GitMerge className="h-3 w-3 text-blue-600" />
                          </div>
                          <div className="space-y-1.5">
                            <div className="bg-white p-1.5 rounded border border-gray-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-[10px] font-medium">Istanbul → Lagos</div>
                                  <div className="text-[8px] text-gray-600">Apr 15, 2025</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[10px] font-medium text-blue-600">95%</div>
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
                                  <div className="text-[10px] font-medium text-blue-600">75%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-gray-200 rounded-lg border border-gray-300 p-2 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <CreditCard className="h-3 w-3 text-blue-600 mr-1" />
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
                          <IstLinqLogo size="md" className="mr-4" />
                        </div>
                        
                        <div className="flex space-x-2">
                          <div className="flex items-center px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium">
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
                            <Package className="h-4 w-4 text-blue-600" />
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
                            <GitMerge className="h-4 w-4 text-blue-600" />
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
                            <Truck className="h-4 w-4 text-blue-600" />
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
                            <Timer className="h-4 w-4 text-blue-600" />
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
                            
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm border-l-4 border-blue-600 w-full">
                              <div className="text-sm text-blue-600 mb-1">istLinq Consolidation</div>
                              <div className="text-xl font-bold text-blue-600">$19,750</div>
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
                            <Activity className="h-4 w-4 text-blue-600" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Space Utilization</span>
                                <span className="font-medium">92%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '92%'}}></div>
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
                            <GitMerge className="h-4 w-4 mr-2 text-blue-600" />
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
                                  <div className="text-sm font-medium text-blue-600">9 Orders</div>
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
                                  <div className="text-sm font-medium text-blue-600">28 Orders</div>
                                  <div className="text-xs text-gray-500">3 Suppliers</div>
                                </div>
                              </div>
                              <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '75%'}}></div>
                              </div>
                              <div className="mt-1 text-xs text-right text-gray-500">75% Filled</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <div className="font-medium text-gray-700 mb-2 flex items-center">
                            <Truck className="h-4 w-4 mr-2 text-blue-600" />
                            Next Shipment
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="h-12 w-12 bg-lavender-100 rounded-lg flex items-center justify-center">
                                <Truck className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-lg font-medium">Istanbul → Matadi</div>
                                <div className="text-sm text-gray-500">Container: 40ft High Cube</div>
                              </div>
                              <div className="ml-auto text-right">
                                <div className="text-sm font-medium">Departure</div>
                                <div className="text-base text-blue-600 font-bold">Apr 15, 2025</div>
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
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '75%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-12 bg-gray-50 rounded-xl border border-gray-200 p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 text-blue-600 mr-2" />
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
                              <div className="text-lg font-bold mt-1 text-blue-600">$497</div>
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
