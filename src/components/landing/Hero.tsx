
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

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
        
        {/* Dashboard Preview */}
        <div 
          className={`mt-16 relative mx-auto max-w-5xl transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            {/* Gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 pointer-events-none" />
            
            {/* Screenshot with glass effect */}
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
              
              <div className="bg-white">
                {/* Dashboard mockup content */}
                <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50">
                  <div className="col-span-3 bg-white p-4 h-[500px] rounded-lg shadow-sm border border-gray-100">
                    <div className="w-full h-10 bg-blue-500 rounded-md mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-8 w-full bg-gray-100 rounded-md"></div>
                      <div className="h-8 w-full bg-gray-100 rounded-md"></div>
                      <div className="h-8 w-full bg-blue-100 rounded-md"></div>
                      <div className="h-8 w-full bg-gray-100 rounded-md"></div>
                      <div className="h-8 w-full bg-gray-100 rounded-md"></div>
                    </div>
                  </div>
                  
                  <div className="col-span-9 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-8 w-24 bg-blue-100 rounded-md"></div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-8 w-24 bg-green-100 rounded-md"></div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-8 w-24 bg-yellow-100 rounded-md"></div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-64">
                      <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                      <div className="h-48 bg-gray-100 rounded-md"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-44">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="h-32 bg-gray-100 rounded-md"></div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-44">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-6 bg-gray-100 rounded-md"></div>
                          <div className="h-6 bg-gray-100 rounded-md"></div>
                          <div className="h-6 bg-gray-100 rounded-md"></div>
                          <div className="h-6 bg-gray-100 rounded-md"></div>
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
