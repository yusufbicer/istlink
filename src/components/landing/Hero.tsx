
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
      {/* Futuristic background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
      
      {/* Animated glowing orbs */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-purple/20 rounded-full filter blur-3xl opacity-60 animate-glow-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-neon-blue/20 rounded-full filter blur-3xl opacity-50 animate-glow-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-40 h-40 bg-neon-cyan/20 rounded-full filter blur-3xl opacity-40 animate-glow-pulse" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block py-1 px-4 text-sm font-medium bg-neon-purple/10 text-neon-purple rounded-full mb-5 font-future border border-neon-purple/30">
              NEURAL CONSOLIDATION MATRIX
            </span>
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 transition-all duration-1000 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } font-future`}
          >
            Turkish Supply Chain Complexity, <span className="cyber-text text-glow">Elegantly Resolved</span>
          </h1>
          
          <p 
            className={`text-xl text-foreground/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
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
            <Button asChild size="lg" className="h-12 px-8 text-md bg-neon-purple hover:bg-neon-purple/90 font-future shadow-neon-purple border border-white/10">
              <Link to="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-md border-neon-purple text-neon-purple hover:bg-neon-purple/10 font-future">
              <a href="https://calendly.com/yourusername" target="_blank" rel="noopener noreferrer">
                Chat With Us
              </a>
            </Button>
          </div>
        </div>
        
        {/* Dashboard Preview */}
        <div 
          className={`mt-16 relative mx-auto max-w-5xl transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="relative rounded-xl overflow-hidden shadow-neon-purple">
            {/* Gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan pointer-events-none"></div>
            
            {/* Dashboard with futuristic glass effect */}
            <div className="rounded-xl overflow-hidden neo-glass border-0 scanline">
              {/* Mockup of the futuristic dashboard */}
              <div className="relative bg-cyber-dark px-2 pt-2 pb-1 flex items-center rounded-t-xl border-b border-neon-purple/30">
                <div className="flex space-x-1.5 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
                  <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
                  <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
                </div>
                <div className="mx-auto">
                  <div className="h-4 w-64 bg-secondary/50 rounded-full"></div>
                </div>
              </div>
              
              {isMobile ? (
                // Mobile-optimized dashboard with futuristic design
                <div className="bg-cyber-dark text-foreground p-4">
                  {/* Mobile Dashboard Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-neon-purple via-neon-blue to-neon-purple relative overflow-hidden">
                        <Zap className="w-4 h-4 text-white absolute" />
                        <Atom className="w-5 h-5 text-white/80 animate-pulse" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm font-future">GROOP</div>
                        <div className="text-xs text-neon-purple">BEYOND BORDERS</div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-7 h-7 rounded-full bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Dashboard Content */}
                  <div className="space-y-3">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary/30 p-3 rounded-lg border border-neon-purple/30">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-foreground/60 text-xs">Orders</span>
                          <span className="text-neon-purple"><Package className="h-3 w-3" /></span>
                        </div>
                        <div className="text-lg font-bold font-future">28</div>
                        <div className="flex items-center mt-1 text-neon-green text-xs">
                          <TrendingUp className="h-2 w-2 mr-1" />
                          <span>Active</span>
                        </div>
                      </div>
                      <div className="bg-secondary/30 p-3 rounded-lg border border-neon-purple/30">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-foreground/60 text-xs">Consolidations</span>
                          <span className="text-neon-purple"><GitMerge className="h-3 w-3" /></span>
                        </div>
                        <div className="text-lg font-bold font-future">5</div>
                        <div className="flex items-center mt-1 text-neon-green text-xs">
                          <TrendingUp className="h-2 w-2 mr-1" />
                          <span>In Progress</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Improved Mobile Consolidation Visual */}
                    <div className="bg-secondary/30 p-3 rounded-lg border border-neon-purple/30 h-60 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                        <span className="text-xs font-medium font-future">Consolidation Efficiency</span>
                      </div>
                      
                      {/* Consolidation Process Visualization */}
                      <svg className="w-full h-full" viewBox="0 0 200 180">
                        {/* Connection lines */}
                        <line x1="50" y1="90" x2="100" y2="40" stroke="url(#gradientLine1)" strokeWidth="1" />
                        <line x1="50" y1="90" x2="100" y2="90" stroke="url(#gradientLine2)" strokeWidth="1" />
                        <line x1="50" y1="90" x2="100" y2="140" stroke="url(#gradientLine3)" strokeWidth="1" />
                        <line x1="100" y1="40" x2="150" y2="90" stroke="url(#gradientLine4)" strokeWidth="1" />
                        <line x1="100" y1="90" x2="150" y2="90" stroke="url(#gradientLine5)" strokeWidth="1" />
                        <line x1="100" y1="140" x2="150" y2="90" stroke="url(#gradientLine6)" strokeWidth="1" />
                        <line x1="150" y1="90" x2="200" y2="90" stroke="url(#gradientLine7)" strokeWidth="1" />
                        
                        {/* Gradient definitions */}
                        <defs>
                          <linearGradient id="gradientLine1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9b87f5" />
                            <stop offset="100%" stopColor="#0EA5E9" />
                          </linearGradient>
                          <linearGradient id="gradientLine2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9b87f5" />
                            <stop offset="100%" stopColor="#0EA5E9" />
                          </linearGradient>
                          <linearGradient id="gradientLine3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9b87f5" />
                            <stop offset="100%" stopColor="#0EA5E9" />
                          </linearGradient>
                          <linearGradient id="gradientLine4" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0EA5E9" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                          <linearGradient id="gradientLine5" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0EA5E9" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                          <linearGradient id="gradientLine6" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0EA5E9" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                          <linearGradient id="gradientLine7" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#06B6D4" />
                          </linearGradient>
                        </defs>
                        
                        {/* Pulse animations */}
                        <circle r="2" fill="#8B5CF6">
                          <animateMotion path="M50,90 L100,40" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle r="2" fill="#8B5CF6">
                          <animateMotion path="M50,90 L100,90" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle r="2" fill="#0EA5E9">
                          <animateMotion path="M100,90 L150,90" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle r="2" fill="#06B6D4">
                          <animateMotion path="M150,90 L200,90" dur="3s" repeatCount="indefinite" />
                        </circle>
                        
                        {/* Connection nodes with futuristic styling */}
                        <circle cx="50" cy="90" r="10" fill="#8B5CF6" />
                        <circle cx="50" cy="90" r="6" fill="#1A1F2C" />
                        <circle cx="50" cy="90" r="3" fill="#8B5CF6" className="animate-pulse" />
                        
                        <circle cx="100" cy="40" r="8" fill="#0EA5E9" />
                        <circle cx="100" cy="40" r="4" fill="#1A1F2C" />
                        <circle cx="100" cy="40" r="2" fill="#0EA5E9" className="animate-pulse" />
                        
                        <circle cx="100" cy="90" r="8" fill="#0EA5E9" />
                        <circle cx="100" cy="90" r="4" fill="#1A1F2C" />
                        <circle cx="100" cy="90" r="2" fill="#0EA5E9" className="animate-pulse" />
                        
                        <circle cx="100" cy="140" r="8" fill="#0EA5E9" />
                        <circle cx="100" cy="140" r="4" fill="#1A1F2C" />
                        <circle cx="100" cy="140" r="2" fill="#0EA5E9" className="animate-pulse" />
                        
                        <circle cx="150" cy="90" r="10" fill="#8B5CF6" />
                        <circle cx="150" cy="90" r="6" fill="#1A1F2C" />
                        <circle cx="150" cy="90" r="3" fill="#8B5CF6" className="animate-pulse" />
                        
                        <circle cx="200" cy="90" r="10" fill="#06B6D4" />
                        <circle cx="200" cy="90" r="6" fill="#1A1F2C" />
                        <circle cx="200" cy="90" r="3" fill="#06B6D4" className="animate-pulse" />
                        
                        {/* Labels - Positioned for better visibility */}
                        <text x="50" y="110" fill="white" fontSize="8" textAnchor="middle" className="font-future">Importers</text>
                        <text x="100" y="30" fill="white" fontSize="7" textAnchor="middle">Supplier A</text>
                        <text x="100" y="80" fill="white" fontSize="7" textAnchor="middle">Supplier B</text>
                        <text x="100" y="150" fill="white" fontSize="7" textAnchor="middle">Supplier C</text>
                        <text x="150" y="110" fill="white" fontSize="8" textAnchor="middle" className="font-future">Consolidation</text>
                        <text x="200" y="110" fill="white" fontSize="8" textAnchor="middle" className="font-future">Shipping</text>
                      </svg>
                    </div>
                    
                    {/* Activity List */}
                    <div className="bg-secondary/30 p-3 rounded-lg border border-neon-purple/30">
                      <div className="text-xs font-medium mb-2 font-future">Recent Updates</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-secondary/50 rounded text-xs border border-neon-green/30">
                          <span>CON-2023-1458</span>
                          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-neon-green/10 text-neon-green border border-neon-green/30">Ready to Ship</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-secondary/50 rounded text-xs border border-neon-blue/30">
                          <span>CON-2023-1457</span>
                          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/30">Consolidating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Desktop dashboard content with futuristic design
                <div className="bg-cyber-dark text-foreground">
                  {/* Dashboard content */}
                  <div className="grid grid-cols-12 gap-4 p-6 bg-cyber-dark">
                    {/* Sidebar */}
                    <div className="col-span-3 bg-secondary/30 p-4 h-[540px] rounded-lg border border-neon-purple/30">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-neon-purple via-neon-blue to-neon-purple relative overflow-hidden">
                          <Zap className="w-4 h-4 text-white absolute" />
                          <Atom className="w-5 h-5 text-white/80 animate-pulse" />
                        </div>
                        <div className="ml-2">
                          <div className="font-bold text-white font-future">GROOP</div>
                          <div className="text-xs text-neon-purple">BEYOND BORDERS</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-9 w-full bg-neon-purple/80 rounded-md flex items-center px-3 text-sm font-medium border border-white/10 shadow-neon-purple">
                          <Activity className="h-4 w-4 mr-2" /> Overview
                        </div>
                        <div className="h-9 w-full bg-secondary/50 hover:bg-secondary/70 rounded-md flex items-center px-3 text-sm font-medium text-foreground/80 border border-neon-purple/20 transition-colors">
                          <Package className="h-4 w-4 mr-2 text-neon-blue" /> Orders
                        </div>
                        <div className="h-9 w-full bg-secondary/50 hover:bg-secondary/70 rounded-md flex items-center px-3 text-sm font-medium text-foreground/80 border border-neon-purple/20 transition-colors">
                          <GitMerge className="h-4 w-4 mr-2 text-neon-green" /> Consolidations
                        </div>
                        <div className="h-9 w-full bg-secondary/50 hover:bg-secondary/70 rounded-md flex items-center px-3 text-sm font-medium text-foreground/80 border border-neon-purple/20 transition-colors">
                          <TrendingUp className="h-4 w-4 mr-2 text-neon-cyan" /> Analytics
                        </div>
                        <div className="h-9 w-full bg-secondary/50 hover:bg-secondary/70 rounded-md flex items-center px-3 text-sm font-medium text-foreground/80 border border-neon-purple/20 transition-colors">
                          <Network className="h-4 w-4 mr-2 text-neon-pink" /> Suppliers
                        </div>
                      </div>
                    </div>
                    
                    {/* Main dashboard area */}
                    <div className="col-span-9 space-y-4">
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-secondary/30 p-4 rounded-lg border border-neon-purple/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-foreground/60 text-sm">Active Orders</span>
                            <span className="text-neon-purple"><Package className="h-4 w-4" /></span>
                          </div>
                          <div className="text-2xl font-bold font-future">28</div>
                          <div className="flex items-center mt-2 text-neon-green text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+5 since last week</span>
                          </div>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-lg border border-neon-purple/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-foreground/60 text-sm">Consolidations</span>
                            <span className="text-neon-purple"><GitMerge className="h-4 w-4" /></span>
                          </div>
                          <div className="text-2xl font-bold font-future">5</div>
                          <div className="flex items-center mt-2 text-neon-green text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>2 ready to ship</span>
                          </div>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-lg border border-neon-purple/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-foreground/60 text-sm">Space Utilization</span>
                            <span className="text-neon-purple"><Truck className="h-4 w-4" /></span>
                          </div>
                          <div className="text-2xl font-bold font-future">92%</div>
                          <div className="flex items-center mt-2 text-neon-green text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+8% improved efficiency</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Consolidation Efficiency Metrics */}
                      <div className="bg-secondary/30 p-4 rounded-lg border border-neon-purple/30 h-64 relative">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium font-future">Consolidation Efficiency Metrics</span>
                          <div className="flex space-x-2">
                            <div className="h-6 w-6 rounded bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="h-6 w-6 rounded bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Updated Consolidation Efficiency Visualization with futuristic design */}
                        <div className="grid grid-cols-5 gap-4 h-48">
                          {/* Container Space Utilization */}
                          <div className="col-span-2 bg-secondary/50 rounded-lg p-3 flex flex-col justify-between border border-neon-blue/30">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium font-future">Container Utilization</span>
                              <Truck className="h-3 w-3 text-neon-blue" />
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                              <div className="relative w-24 h-24 rounded border border-neon-blue/50 shadow-neon-blue">
                                {/* Container with boxes inside */}
                                <div className="absolute inset-1 bg-secondary/80 rounded-sm border border-neon-blue/30">
                                  {/* Stacked boxes showing space utilization */}
                                  <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-gradient-to-t from-neon-blue to-neon-purple rounded-sm opacity-80">
                                    <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-px p-px">
                                      {Array(9).fill(0).map((_, i) => (
                                        <div key={i} className="bg-cyber-dark/30 rounded-sm"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold font-future">92%</div>
                              <div className="text-xs text-neon-green">Optimized Space</div>
                            </div>
                          </div>
                          
                          {/* Cost Savings */}
                          <div className="col-span-2 bg-secondary/50 rounded-lg p-3 flex flex-col justify-between border border-neon-green/30">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium font-future">Cost Savings</span>
                              <DollarSign className="h-3 w-3 text-neon-green" />
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                              <div className="w-full">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Traditional</span>
                                  <span>Consolidated</span>
                                </div>
                                <div className="relative h-8 w-full bg-secondary/80 rounded-full mb-3 border border-neon-green/30">
                                  <div className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"></div>
                                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                    35% Saved
                                  </div>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <div className="flex flex-col items-center">
                                    <span className="font-future">$14,500</span>
                                    <span className="text-[10px] text-foreground/60">Separate</span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <span className="font-future">$9,425</span>
                                    <span className="text-[10px] text-foreground/60">Consolidated</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Time Savings */}
                          <div className="bg-secondary/50 rounded-lg p-3 flex flex-col justify-between border border-neon-cyan/30">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium font-future">Time Saved</span>
                              <FileText className="h-3 w-3 text-neon-cyan" />
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-3xl font-bold font-future">68%</div>
                                <div className="text-xs text-neon-cyan">Documentation</div>
                                <div className="text-xs">Time Saved</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Consolidation Data and Payment Status */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/30 p-4 rounded-lg border border-neon-purple/30 h-44">
                          <div className="font-medium mb-3 font-future">Active Consolidations</div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-secondary/50 rounded border border-neon-green/30">
                              <span className="text-sm font-future">CON-2023-1458</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-neon-green/10 text-neon-green border border-neon-green/30">Ready to Ship</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-secondary/50 rounded border border-neon-blue/30">
                              <span className="text-sm font-future">CON-2023-1457</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/30">Consolidating</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-secondary/50 rounded border border-neon-purple/30">
                              <span className="text-sm font-future">CON-2023-1456</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/30">Payments</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-lg border border-neon-purple/30 h-44">
                          <div className="font-medium mb-2 font-future">Payment Status</div>
                          <div className="h-32 w-full">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex flex-col">
                                <span className="text-sm">Total Value</span>
                                <span className="text-lg font-bold font-future">$158,450</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm">Service Fees</span>
                                <span className="text-lg font-bold font-future">$7,922</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Paid to Suppliers</span>
                                <span className="text-sm font-medium text-neon-green font-future">$112,300</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Pending Payments</span>
                                <span className="text-sm font-medium text-neon-cyan font-future">$46,150</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Collection Rate</span>
                                <span className="text-sm font-medium text-neon-blue font-future">94%</span>
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
