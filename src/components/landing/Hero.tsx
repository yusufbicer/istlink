
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, GitMerge, Truck, Package, Users, Bell, FileText, CheckCircle, Clock, DollarSign, Ship, MapPin, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import BundleistLogo from '@/components/common/BundleistLogo';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();

  const alternatingTexts = {
    en: ["Simplified & Streamlined", "Elegantly Resolved"],
    tr: ["Basitleştirilmiş ve Düzenli", "Zarif Bir Şekilde Çözümlenmiş"],
    fr: ["Simplifié et Rationalisé", "Résolu avec élégance"]
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % 2);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-6 md:pt-32 md:pb-8 overflow-hidden relative bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-gradient-radial from-blue-100/40 via-transparent to-transparent opacity-60" />
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-blue-200 to-lavender-200 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full filter blur-3xl opacity-15 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center mb-4 md:mb-6">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-block py-2 px-4 text-xs md:text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4 md:mb-6 border border-blue-200 shadow-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              ✨ {t('smartExportConsolidation')}
            </span>
          </div>
          
          <h1 className={`text-xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold md:font-normal leading-tight mb-3 md:mb-4 transition-all duration-1000 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-gray-900`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <span className="block mb-2 font-bold">
              <span className="text-gray-900">{t('turkishSupplyChain')}</span> <span className="text-gray-700">{t('complexity')}</span>
            </span>
            <span className="block relative h-8 md:h-12 lg:h-16 xl:h-20 overflow-hidden">
              <span className={`absolute inset-0 text-blue-900 font-semibold md:font-medium transition-all duration-700 ease-in-out ${currentTextIndex === 0 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                {alternatingTexts[i18n.language as keyof typeof alternatingTexts]?.[0] || alternatingTexts.en[0]}
              </span>
              <span className={`absolute inset-0 text-gray-800 font-semibold md:font-medium transition-all duration-700 ease-in-out ${currentTextIndex === 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
                {alternatingTexts[i18n.language as keyof typeof alternatingTexts]?.[1] || alternatingTexts.en[1]}
              </span>
            </span>
          </h1>
          
          <div className={`text-sm md:text-lg lg:text-xl mb-4 md:mb-6 max-w-4xl mx-auto transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="leading-relaxed px-2 text-gray-700" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('heroDescription')}
            </p>
          </div>
          
          <div className={`flex justify-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button asChild size="default" className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              <a href="https://cal.com/yusuf-bicer-8ytuyg" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" /> {t('talkToOurTeam')}
              </a>
            </Button>
          </div>
        
          <div className={`mt-3 md:mt-4 relative mx-auto max-w-7xl transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <div className="bg-gray-800 p-0.5 rounded-lg">
                <div className="rounded-lg overflow-hidden bg-white border-0">
                  <div className="relative bg-gray-100 px-3 pt-2 pb-1.5 flex items-center rounded-t-lg">
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
                      {/* Mobile Header */}
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <BundleistLogo size="xs" showText={true} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-gray-600" />
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-medium">J</div>
                        </div>
                      </div>

                      {/* Welcome Section */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-lg font-bold text-gray-900">Welcome, John Smith</h2>
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Pro</span>
                        </div>
                      </div>

                      {/* Metric Cards */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 p-3 rounded-lg text-white">
                          <div className="text-xs opacity-90 mb-1">REVENUE</div>
                          <div className="text-lg font-bold">$124,680</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-3 rounded-lg text-white">
                          <div className="text-xs opacity-90 mb-1">ORDERS</div>
                          <div className="text-lg font-bold">387</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-3 rounded-lg text-white">
                          <div className="text-xs opacity-90 mb-1">PENDING</div>
                          <div className="text-lg font-bold">12</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-3 rounded-lg text-white">
                          <div className="text-xs opacity-90 mb-1">PROCESSING</div>
                          <div className="text-lg font-bold">5</div>
                        </div>
                      </div>

                      {/* Active Operations */}
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-3">
                        <div className="flex items-center mb-2">
                          <GitMerge className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm font-semibold text-blue-800">Active Operations</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">Operation Alpha</span>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">In Progress</span>
                          </div>
                          <div className="text-xs text-gray-600 mb-1">Istanbul → New York</div>
                          <div className="text-xs text-gray-500">Departure: Dec 15, 2024</div>
                        </div>
                      </div>

                      {/* Recent Deliveries */}
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center mb-2">
                          <Ship className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm font-semibold text-green-800">Recent Deliveries</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white p-2 rounded border flex justify-between items-center">
                            <div>
                              <div className="font-medium text-xs">Project Beta</div>
                              <div className="text-xs text-gray-500">Completed</div>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">View →</span>
                          </div>
                          <div className="bg-white p-2 rounded border flex justify-between items-center">
                            <div>
                              <div className="font-medium text-xs">Project Gamma</div>
                              <div className="text-xs text-gray-500">Completed</div>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">View →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Desktop Dashboard
                    <div className="bg-white text-gray-800 p-4">
                      {/* Header with Navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-6">
                          <BundleistLogo size="sm" showText={true} />
                          <div className="flex items-center space-x-1">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center">
                              <span className="mr-2">📊</span> Overview
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center">
                              <span className="mr-2">📋</span> Orders
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center">
                              <span className="mr-2">🔗</span> Operations
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center">
                              <span className="mr-2">🚢</span> Logistics
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center">
                              <span className="mr-2">👥</span> Partners
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center">
                              <span className="mr-2">💳</span> Finance
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-gray-600" />
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm text-white font-medium">J</div>
                          <span className="text-sm text-gray-700">Sign Out</span>
                        </div>
                      </div>

                      {/* Welcome Section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-xl font-bold text-gray-900">Welcome back, John Smith</h1>
                          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full font-medium">Pro</span>
                        </div>
                      </div>

                      {/* Metric Cards */}
                      <div className="grid grid-cols-5 gap-3 mb-6">
                        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 p-4 rounded-xl text-white relative overflow-hidden">
                          <div className="relative z-10">
                            <div className="text-xs opacity-90 mb-1 font-medium">REVENUE</div>
                            <div className="text-xl font-bold">$124,680</div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-20">
                            <DollarSign className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-xl text-white relative overflow-hidden">
                          <div className="relative z-10">
                            <div className="text-xs opacity-90 mb-1 font-medium">ORDERS</div>
                            <div className="text-xl font-bold">387</div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-20">
                            <Package className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-4 rounded-xl text-white relative overflow-hidden">
                          <div className="relative z-10">
                            <div className="text-xs opacity-90 mb-1 font-medium">PENDING</div>
                            <div className="text-xl font-bold">12</div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-20">
                            <Clock className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 rounded-xl text-white relative overflow-hidden">
                          <div className="relative z-10">
                            <div className="text-xs opacity-90 mb-1 font-medium">PROCESSING</div>
                            <div className="text-xl font-bold">5</div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-20">
                            <Activity className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-4 rounded-xl text-white relative overflow-hidden">
                          <div className="relative z-10">
                            <div className="text-xs opacity-90 mb-1 font-medium">PARTNERS</div>
                            <div className="text-xl font-bold">24</div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-20">
                            <Users className="h-6 w-6" />
                          </div>
                        </div>
                      </div>

                      {/* Main Content Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {/* Active Operations */}
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                          <div className="flex items-center mb-2">
                            <GitMerge className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="font-semibold text-blue-800 text-sm">Active Operations</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-blue-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-sm">Operation Alpha</span>
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">In Progress</span>
                            </div>
                            <div className="text-xs text-gray-600 mb-1">Istanbul → New York</div>
                            <div className="text-xs text-gray-500 mb-2">Departure: Dec 15, 2024</div>
                            <div className="grid grid-cols-2 gap-3 text-center text-xs">
                              <div>
                                <div className="font-semibold">68.5%</div>
                                <div className="text-gray-500">Progress</div>
                              </div>
                              <div>
                                <div className="font-semibold">32.1%</div>
                                <div className="text-gray-500">Load</div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Container: 40ft Standard</div>
                          </div>
                        </div>

                        {/* Pending Tasks */}
                        <div className="bg-orange-50 p-3 rounded-xl border border-orange-200">
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 text-orange-600 mr-2" />
                            <span className="font-semibold text-orange-800 text-sm">Pending Tasks</span>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white p-2 rounded-lg border border-orange-100">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-xs">Document Review</span>
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Due Today</span>
                              </div>
                              <div className="text-xs text-gray-600">Project Beta Documentation</div>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-orange-100">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-xs">Quality Check</span>
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Urgent</span>
                              </div>
                              <div className="text-xs text-gray-600">Incoming Shipment #2847</div>
                            </div>
                          </div>
                        </div>

                        {/* Recent Deliveries */}
                        <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                          <div className="flex items-center mb-2">
                            <Ship className="h-4 w-4 text-green-600 mr-2" />
                            <span className="font-semibold text-green-800 text-sm">Recent Deliveries</span>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white p-2 rounded-lg border border-green-100">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-xs">Project Beta</span>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Delivered</span>
                              </div>
                              <div className="text-xs text-gray-600 mb-1">Carrier: FastShip Express</div>
                              <div className="text-xs text-gray-500 mb-1">Completed: Dec 8, 2024</div>
                              <div className="flex justify-between">
                                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">Track Details →</span>
                                <span className="text-xs text-gray-600">Standard Service</span>
                              </div>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-green-100">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-xs">Project Gamma</span>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Delivered</span>
                              </div>
                              <div className="text-xs text-gray-600 mb-1">Carrier: Global Logistics</div>
                              <div className="text-xs text-gray-500 mb-1">Completed: Dec 5, 2024</div>
                              <div className="flex justify-between">
                                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">Track Details →</span>
                                <span className="text-xs text-gray-600">Express Service</span>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
