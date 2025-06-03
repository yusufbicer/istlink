
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Globe, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IstLinqLogo from '@/components/common/IstLinqLogo';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-200 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-15 animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Enhanced badge */}
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 rounded-full mb-6 shadow-sm">
              <Globe className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Turkey's Premier Supply Chain Solution</span>
            </div>
            
            {/* Main headline with improved gradient colors */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 via-blue-800 to-emerald-700 bg-clip-text text-transparent animate-gradient-x">
                Turkish Supply Chain Complexity, Simplified & Streamlined
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect with Turkish suppliers seamlessly. We handle consolidation, payments, and logistics so you can focus on growing your business globally.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/early-access')}
              >
                Request Early Access
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                <span>Trusted by 100+ businesses</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                <span>$10M+ in transactions</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                <span>15+ countries served</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Dashboard Preview */}
          <div className={`flex-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative max-w-2xl mx-auto">
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-2xl shadow-lg flex items-center justify-center animate-float">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-100 rounded-xl shadow-lg flex items-center justify-center animate-float delay-1000">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              
              {/* Main dashboard mockup */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IstLinqLogo size="sm" />
                      <span className="ml-3 font-bold text-lg">istLinq Dashboard</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Active Orders</div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">$24.5K</div>
                      <div className="text-sm text-gray-600">This Month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                        <span className="text-sm">Textile Order #1247</span>
                      </div>
                      <span className="text-xs text-gray-500">Shipped</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm">Electronics Order #1248</span>
                      </div>
                      <span className="text-xs text-gray-500">Processing</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-sm">Ceramic Order #1249</span>
                      </div>
                      <span className="text-xs text-gray-500">Pending</span>
                    </div>
                  </div>
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
