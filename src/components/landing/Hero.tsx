
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Bell, BarChart2, TrendingUp, Package, Users, DollarSign, Activity } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-70 pointer-events-none" />
      
      {/* Animated blobs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-5">
              Simplifying Cross-Border Commerce
            </span>
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 transition-all duration-1000 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Seamless Consolidation for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Global Buyers</span>
          </h1>
          
          <p 
            className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Consolidate multiple purchases from Turkish suppliers into a single shipment. 
            Simplify payments, documentation, and tracking with our modern dashboard.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button asChild size="lg" className="h-12 px-8 text-md">
              <Link to="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-md">
              <Link to="/#how-it-works">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Enhanced Dashboard Preview */}
        <div 
          className={`mt-16 relative mx-auto max-w-5xl transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            {/* Gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 pointer-events-none" />
            
            {/* Screenshot with glass effect */}
            <div className="rounded-xl overflow-hidden border-0">
              {/* Mockup of the dashboard */}
              <div className="relative bg-gray-900 px-2 pt-2 pb-1 flex items-center rounded-t-xl">
                <div className="flex space-x-1.5 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto flex items-center justify-center">
                  <div className="h-4 w-64 bg-gray-800 rounded-full flex items-center px-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <div className="text-xs text-gray-400">shipsync.app/dashboard</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white">
                {/* Dashboard mockup content */}
                <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50">
                  {/* Left sidebar */}
                  <div className="col-span-3 bg-white p-4 h-[500px] rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-bold text-lg text-blue-600">ShipSync</div>
                    </div>
                    
                    <div className="space-y-1 mt-6">
                      <div className="h-9 w-full bg-blue-50 text-blue-600 rounded-md flex items-center px-3 font-medium">
                        <BarChart2 className="h-4 w-4 mr-3" />
                        <span className="text-sm">Dashboard</span>
                      </div>
                      <div className="h-9 w-full hover:bg-gray-100 rounded-md flex items-center px-3 text-gray-700">
                        <Package className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm">Orders</span>
                      </div>
                      <div className="h-9 w-full hover:bg-gray-100 rounded-md flex items-center px-3 text-gray-700">
                        <Users className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm">Suppliers</span>
                      </div>
                      <div className="h-9 w-full hover:bg-gray-100 rounded-md flex items-center px-3 text-gray-700">
                        <TrendingUp className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm">Analytics</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-10 ml-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-800 mb-1">Need Help?</div>
                        <div className="text-xs text-gray-600 mb-2">Our support team is ready to assist you</div>
                        <button className="text-xs bg-white text-blue-600 border border-blue-200 rounded px-3 py-1 font-medium">Contact Support</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main content area */}
                  <div className="col-span-9 space-y-4">
                    {/* Welcome bar */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-800">Welcome back, Michael!</div>
                        <div className="text-sm text-gray-500">Tuesday, 12 September 2023</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Bell className="h-5 w-5 text-gray-500" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">M</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats cards */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-sm text-gray-500">Active Orders</div>
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Package className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">12</div>
                        <div className="flex items-center mt-1 text-xs text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+20% from last month</span>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-sm text-gray-500">Pending Shipments</div>
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Package className="h-4 w-4 text-indigo-600" />
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">3</div>
                        <div className="flex items-center mt-1 text-xs text-red-600">
                          <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                          <span>-10% from last month</span>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-sm text-gray-500">Total Suppliers</div>
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">8</div>
                        <div className="flex items-center mt-1 text-xs text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+5% from last month</span>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-sm text-gray-500">Monthly Spend</div>
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-amber-600" />
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">$24,500</div>
                        <div className="flex items-center mt-1 text-xs text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+15% from last month</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-64">
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-medium text-gray-800">Orders Overview</div>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Last 6 months</div>
                        </div>
                        <div className="h-48 flex items-end space-x-2 mt-4 px-2">
                          <div className="h-20 w-full bg-blue-100 rounded-t-sm relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">10</div>
                          </div>
                          <div className="h-28 w-full bg-blue-200 rounded-t-sm relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">15</div>
                          </div>
                          <div className="h-44 w-full bg-blue-300 rounded-t-sm relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">25</div>
                          </div>
                          <div className="h-40 w-full bg-blue-400 rounded-t-sm relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">22</div>
                          </div>
                          <div className="h-full w-full bg-blue-500 rounded-t-sm relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">30</div>
                          </div>
                          <div className="h-48 w-full bg-blue-600 rounded-t-sm relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">28</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 px-2">
                          <div className="text-xs text-gray-500">Jan</div>
                          <div className="text-xs text-gray-500">Feb</div>
                          <div className="text-xs text-gray-500">Mar</div>
                          <div className="text-xs text-gray-500">Apr</div>
                          <div className="text-xs text-gray-500">May</div>
                          <div className="text-xs text-gray-500">Jun</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-64">
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-medium text-gray-800">Shipping Activity</div>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Last 6 months</div>
                        </div>
                        <div className="h-48 relative pt-4">
                          {/* SVG Line Chart Mockup */}
                          <svg className="w-full h-full" viewBox="0 0 300 120">
                            {/* Grid lines */}
                            <line x1="0" y1="0" x2="300" y2="0" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="30" x2="300" y2="30" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="60" x2="300" y2="60" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="90" x2="300" y2="90" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="120" x2="300" y2="120" stroke="#f0f0f0" strokeWidth="1" />
                            
                            {/* Line chart */}
                            <path 
                              d="M0,100 L50,90 L100,60 L150,70 L200,40 L250,50 L300,30" 
                              fill="none" 
                              stroke="#3b82f6" 
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            
                            {/* Data points */}
                            <circle cx="0" cy="100" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="50" cy="90" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="100" cy="60" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="150" cy="70" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="200" cy="40" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="250" cy="50" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="300" cy="30" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                          </svg>
                        </div>
                        <div className="flex justify-between mt-2 px-2">
                          <div className="text-xs text-gray-500">Jan</div>
                          <div className="text-xs text-gray-500">Feb</div>
                          <div className="text-xs text-gray-500">Mar</div>
                          <div className="text-xs text-gray-500">Apr</div>
                          <div className="text-xs text-gray-500">May</div>
                          <div className="text-xs text-gray-500">Jun</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recent Activities */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-medium text-gray-800">Recent Activity</div>
                        <div className="text-xs text-blue-600 font-medium cursor-pointer">View all</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-800">New order placed</div>
                                <div className="text-xs text-gray-500">Order #12345 with 3 items</div>
                              </div>
                              <div className="text-xs text-gray-500">Just now</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-800">Shipment prepared</div>
                                <div className="text-xs text-gray-500">Consolidated shipment #5678</div>
                              </div>
                              <div className="text-xs text-gray-500">2 hours ago</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-800">Supplier payment</div>
                                <div className="text-xs text-gray-500">Paid $2,450 to Supplier A</div>
                              </div>
                              <div className="text-xs text-gray-500">5 hours ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shadow effect */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
