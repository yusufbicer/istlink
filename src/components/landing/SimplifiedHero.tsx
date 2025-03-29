
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import dashboardPlaceholder from '@/assets/hero/placeholder-dashboard.svg';

const SimplifiedHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle visibility animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      {/* Background gradient - simplified */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-transparent opacity-70 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hero content with simplified transitions */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-block py-1 px-3 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-4">
              Smart Consolidation Solutions
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              Turkish Supply Chain Complexity, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Elegantly Resolved</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-7 max-w-2xl mx-auto">
              Transform fragmented Turkish supplier purchases into a single, streamlined shipment with our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700">
                <Link to="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 px-6 border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                <a href="https://calendly.com/yourusername" target="_blank" rel="noopener noreferrer">
                  Chat With Us
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Simple dashboard preview */}
        <div 
          className={`mt-12 relative mx-auto max-w-4xl transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            {/* Gradient border effect - simplified */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 p-0.5" />
            
            <div className="rounded-xl overflow-hidden bg-gray-900 border-0">
              {/* Dashboard header */}
              <div className="relative bg-gray-900 px-2 pt-2 pb-1 flex items-center rounded-t-xl">
                <div className="flex space-x-1.5 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto">
                  <div className="h-4 w-48 bg-gray-800 rounded-full"></div>
                </div>
              </div>
              
              {/* Simplified dashboard image - one image for all devices */}
              <div className="flex items-center justify-center p-8 bg-gray-900">
                <img 
                  src={dashboardPlaceholder} 
                  alt="Dashboard preview" 
                  className="max-w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimplifiedHero;
