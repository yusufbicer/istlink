
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Network, Activity, Zap, TrendingUp, PackageCheck, GitMerge, Atom, Truck, Package, DollarSign, FileText } from 'lucide-react';
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
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-transparent opacity-70 pointer-events-none" />
      
      {/* Animated blobs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block py-1 px-3 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-5">
              Smart Consolidation Solutions
            </span>
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 transition-all duration-1000 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Turkish Supply Chain Complexity, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Elegantly Resolved</span>
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
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button asChild size="lg" className="h-12 px-8 text-md bg-indigo-600 hover:bg-indigo-700">
              <Link to="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-md border-indigo-600 text-indigo-600 hover:bg-indigo-50">
              <a href="https://calendly.com/yourusername" target="_blank" rel="noopener noreferrer">
                Chat With Us
              </a>
            </Button>
          </div>
        </div>
        
        {/* Mobile-friendly Dashboard Preview */}
        <div 
          className={`mt-16 relative mx-auto max-w-5xl transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            {/* Gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 pointer-events-none" />
            
            {/* Dashboard with glass effect */}
            <div className="rounded-xl overflow-hidden glass border-0">
              {/* Mockup of the dashboard */}
              <div className="relative bg-gray-900 px-2 pt-2 pb-1 flex items-center rounded-t-xl">
                <div className="flex space-x-1.5 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto">
                  <div className="h-4 w-64 bg-gray-800 rounded-full"></div>
                </div>
              </div>
              
              {isMobile ? (
                // Mobile-optimized dashboard
                <div className="bg-gray-900 text-white p-4">
                  {/* Mobile Dashboard Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
                        <Zap className="w-4 h-4 text-white absolute" />
                        <Atom className="w-5 h-5 text-white/80 animate-pulse" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">GROOP</div>
                        <div className="text-xs text-indigo-400">BEYOND BORDERS</div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Dashboard Content */}
                  <div className="space-y-3">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 text-xs">Orders</span>
                          <span className="text-indigo-400"><Package className="h-3 w-3" /></span>
                        </div>
                        <div className="text-lg font-bold">28</div>
                        <div className="flex items-center mt-1 text-green-400 text-xs">
                          <TrendingUp className="h-2 w-2 mr-1" />
                          <span>Active</span>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 text-xs">Consolidations</span>
                          <span className="text-indigo-400"><GitMerge className="h-3 w-3" /></span>
                        </div>
                        <div className="text-lg font-bold">5</div>
                        <div className="flex items-center mt-1 text-green-400 text-xs">
                          <TrendingUp className="h-2 w-2 mr-1" />
                          <span>In Progress</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Improved Mobile Consolidation Visual */}
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 h-60 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                        <span className="text-xs font-medium">Consolidation Efficiency</span>
                      </div>
                      
                      {/* Consolidation Process Visualization */}
                      <svg className="w-full h-full" viewBox="0 0 200 180">
                        {/* Connection lines */}
                        <line x1="50" y1="90" x2="100" y2="40" stroke="#4F46E5" strokeWidth="1" />
                        <line x1="50" y1="90" x2="100" y2="90" stroke="#4F46E5" strokeWidth="1" />
                        <line x1="50" y1="90" x2="100" y2="140" stroke="#4F46E5" strokeWidth="1" />
                        <line x1="100" y1="40" x2="150" y2="90" stroke="#4F46E5" strokeWidth="1" />
                        <line x1="100" y1="90" x2="150" y2="90" stroke="#4F46E5" strokeWidth="1" />
                        <line x1="100" y1="140" x2="150" y2="90" stroke="#4F46E5" strokeWidth="1" />
                        <line x1="150" y1="90" x2="200" y2="90" stroke="#4F46E5" strokeWidth="1" />
                        
                        {/* Pulse animations */}
                        <circle r="2" fill="#60A5FA">
                          <animateMotion path="M50,90 L100,40" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle r="2" fill="#60A5FA">
                          <animateMotion path="M50,90 L100,90" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle r="2" fill="#60A5FA">
                          <animateMotion path="M100,90 L150,90" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle r="2" fill="#60A5FA">
                          <animateMotion path="M150,90 L200,90" dur="3s" repeatCount="indefinite" />
                        </circle>
                        
                        {/* Connection nodes with icons */}
                        <circle cx="50" cy="90" r="10" fill="#4F46E5" />
                        <circle cx="50" cy="90" r="5" fill="#818CF8" />
                        
                        <circle cx="100" cy="40" r="8" fill="#4F46E5" />
                        <circle cx="100" cy="40" r="4" fill="#818CF8" />
                        
                        <circle cx="100" cy="90" r="8" fill="#4F46E5" />
                        <circle cx="100" cy="90" r="4" fill="#818CF8" />
                        
                        <circle cx="100" cy="140" r="8" fill="#4F46E5" />
                        <circle cx="100" cy="140" r="4" fill="#818CF8" />
                        
                        <circle cx="150" cy="90" r="10" fill="#4F46E5" />
                        <circle cx="150" cy="90" r="5" fill="#818CF8" />
                        
                        <circle cx="200" cy="90" r="10" fill="#4F46E5" />
                        <circle cx="200" cy="90" r="5" fill="#818CF8" />
                        
                        {/* Labels - Positioned for better visibility */}
                        <text x="50" y="110" fill="white" fontSize="8" textAnchor="middle">Importers</text>
                        <text x="100" y="30" fill="white" fontSize="7" textAnchor="middle">Supplier A</text>
                        <text x="100" y="80" fill="white" fontSize="7" textAnchor="middle">Supplier B</text>
                        <text x="100" y="150" fill="white" fontSize="7" textAnchor="middle">Supplier C</text>
                        <text x="150" y="110" fill="white" fontSize="8" textAnchor="middle">Consolidation</text>
                        <text x="200" y="110" fill="white" fontSize="8" textAnchor="middle">Shipping</text>
                      </svg>
                    </div>
                    
                    {/* Activity List */}
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <div className="text-xs font-medium mb-2">Recent Updates</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-700 rounded text-xs">
                          <span>CON-2023-1458</span>
                          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-green-900 text-green-300">Ready to Ship</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-700 rounded text-xs">
                          <span>CON-2023-1457</span>
                          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-blue-900 text-blue-300">Consolidating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Desktop dashboard content
                <div className="bg-gray-900 text-white">
                  {/* Dashboard content */}
                  <div className="grid grid-cols-12 gap-4 p-6 bg-gray-900">
                    {/* Sidebar */}
                    <div className="col-span-3 bg-gray-800 p-4 h-[540px] rounded-lg border border-gray-700">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
                          <Zap className="w-4 h-4 text-white absolute" />
                          <Atom className="w-5 h-5 text-white/80 animate-pulse" />
                        </div>
                        <div className="ml-2">
                          <div className="font-bold text-white">GROOP</div>
                          <div className="text-xs text-indigo-400">BEYOND BORDERS</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-9 w-full bg-indigo-600 rounded-md flex items-center px-3 text-sm font-medium">
                          <Activity className="h-4 w-4 mr-2" /> Overview
                        </div>
                        <div className="h-9 w-full bg-gray-700 hover:bg-gray-600 rounded-md flex items-center px-3 text-sm font-medium text-gray-200">
                          <Package className="h-4 w-4 mr-2" /> Orders
                        </div>
                        <div className="h-9 w-full bg-gray-700 hover:bg-gray-600 rounded-md flex items-center px-3 text-sm font-medium text-gray-200">
                          <GitMerge className="h-4 w-4 mr-2" /> Consolidations
                        </div>
                        <div className="h-9 w-full bg-gray-700 hover:bg-gray-600 rounded-md flex items-center px-3 text-sm font-medium text-gray-200">
                          <TrendingUp className="h-4 w-4 mr-2" /> Analytics
                        </div>
                        <div className="h-9 w-full bg-gray-700 hover:bg-gray-600 rounded-md flex items-center px-3 text-sm font-medium text-gray-200">
                          <Network className="h-4 w-4 mr-2" /> Suppliers
                        </div>
                      </div>
                    </div>
                    
                    {/* Main dashboard area */}
                    <div className="col-span-9 space-y-4">
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Active Orders</span>
                            <span className="text-indigo-400"><Package className="h-4 w-4" /></span>
                          </div>
                          <div className="text-2xl font-bold">28</div>
                          <div className="flex items-center mt-2 text-green-400 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+5 since last week</span>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Consolidations</span>
                            <span className="text-indigo-400"><GitMerge className="h-4 w-4" /></span>
                          </div>
                          <div className="text-2xl font-bold">5</div>
                          <div className="flex items-center mt-2 text-green-400 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>2 ready to ship</span>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Space Utilization</span>
                            <span className="text-indigo-400"><Truck className="h-4 w-4" /></span>
                          </div>
                          <div className="text-2xl font-bold">92%</div>
                          <div className="flex items-center mt-2 text-green-400 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+8% improved efficiency</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Consolidation Efficiency Metrics */}
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-64 relative">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Consolidation Efficiency Metrics</span>
                          <div className="flex space-x-2">
                            <div className="h-6 w-6 rounded bg-gray-700 flex items-center justify-center">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="h-6 w-6 rounded bg-gray-700 flex items-center justify-center">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Updated Consolidation Efficiency Visualization */}
                        <div className="grid grid-cols-5 gap-4 h-48">
                          {/* Container Space Utilization */}
                          <div className="col-span-2 bg-gray-700 rounded-lg p-3 flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium">Container Utilization</span>
                              <Truck className="h-3 w-3 text-blue-400" />
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                              <div className="relative w-24 h-24 rounded border border-gray-600">
                                {/* Container with boxes inside */}
                                <div className="absolute inset-1 bg-gray-800 rounded-sm border border-gray-600">
                                  {/* Stacked boxes showing space utilization */}
                                  <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-sm opacity-90">
                                    <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-px p-px">
                                      {Array(9).fill(0).map((_, i) => (
                                        <div key={i} className="bg-indigo-700 rounded-sm"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">92%</div>
                              <div className="text-xs text-green-400">Optimized Space</div>
                            </div>
                          </div>
                          
                          {/* Cost Savings */}
                          <div className="col-span-2 bg-gray-700 rounded-lg p-3 flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium">Cost Savings</span>
                              <DollarSign className="h-3 w-3 text-green-400" />
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                              <div className="w-full">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Traditional</span>
                                  <span>Consolidated</span>
                                </div>
                                <div className="relative h-8 w-full bg-gray-600 rounded-full mb-3">
                                  <div className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
                                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                    35% Saved
                                  </div>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <div className="flex flex-col items-center">
                                    <span>$14,500</span>
                                    <span className="text-[10px] text-gray-400">Separate</span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <span>$9,425</span>
                                    <span className="text-[10px] text-gray-400">Consolidated</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Time Savings */}
                          <div className="bg-gray-700 rounded-lg p-3 flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium">Time Saved</span>
                              <FileText className="h-3 w-3 text-blue-400" />
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-3xl font-bold">68%</div>
                                <div className="text-xs text-blue-400">Documentation</div>
                                <div className="text-xs">Time Saved</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Consolidation Data and Payment Status */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-44">
                          <div className="font-medium mb-3">Active Consolidations</div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                              <span className="text-sm">CON-2023-1458</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-green-900 text-green-300">Ready to Ship</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                              <span className="text-sm">CON-2023-1457</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-900 text-blue-300">Consolidating</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                              <span className="text-sm">CON-2023-1456</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-900 text-purple-300">Payments</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-44">
                          <div className="font-medium mb-2">Payment Status</div>
                          <div className="h-32 w-full">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex flex-col">
                                <span className="text-sm">Total Value</span>
                                <span className="text-lg font-bold">$158,450</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm">Service Fees</span>
                                <span className="text-lg font-bold">$7,922</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Paid to Suppliers</span>
                                <span className="text-sm font-medium text-green-400">$112,300</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Pending Payments</span>
                                <span className="text-sm font-medium text-yellow-400">$46,150</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Collection Rate</span>
                                <span className="text-sm font-medium text-blue-400">94%</span>
                              </div>
                            </div>
                          </div>
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
    </section>
  );
};

export default Hero;
