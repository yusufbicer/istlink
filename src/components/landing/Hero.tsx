
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, TrendingUp, Package, Truck, Users, Settings, Search, Bell, ChevronDown } from 'lucide-react';
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
        
          <div className={`mt-6 md:mt-8 relative mx-auto max-w-6xl transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative overflow-hidden rounded-xl shadow-2xl border border-gray-200/50">
              <div className="bg-white p-0 rounded-xl">
                {/* Modern Dashboard Design */}
                <div className="bg-white text-slate-800">
                  {/* Top Navigation Bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                    <div className="flex items-center space-x-6">
                      <BundleistLogo size="sm" showText={true} />
                      <nav className="hidden md:flex items-center space-x-1">
                        <button className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-500 rounded-lg flex items-center space-x-2">
                          <span>🏠</span>
                          <span>Dashboard</span>
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg flex items-center space-x-2">
                          <span>📦</span>
                          <span>Orders</span>
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg flex items-center space-x-2">
                          <span>🔗</span>
                          <span>Consolidations</span>
                        </button>
                      </nav>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <Bell className="h-4 w-4 text-gray-600" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">3</span>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                        JD
                      </div>
                    </div>
                  </div>

                  {/* Welcome Section */}
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-bold text-gray-900">Welcome, John Doe - Batch #A247</h1>
                        <p className="text-gray-600 mt-0.5 text-sm">Here's what's happening with your shipments today.</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="px-4 py-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl text-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium opacity-90">BALANCE</span>
                          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                        </div>
                        <div className="text-xl font-bold">$125,340.50</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl text-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium opacity-90">SHIPMENTS</span>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="text-xl font-bold">2</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl text-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium opacity-90">ORDERS IN PROGRESS</span>
                          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                        </div>
                        <div className="text-xl font-bold">8</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl text-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium opacity-90">ACTIVE CONSOLIDATIONS</span>
                          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                        </div>
                        <div className="text-xl font-bold">1</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-xl text-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium opacity-90">SUPPLIERS</span>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="text-xl font-bold">6</div>
                      </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Active Consolidations */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-semibold text-blue-900 flex items-center">
                            <Package className="mr-2 h-4 w-4" />
                            Active Consolidations
                          </h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-blue-800">atlas-europe</span>
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">Planning</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">ist-hamburg</p>
                            <p className="text-sm text-gray-500">Departs: 22.12.2025</p>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-gray-500">Volume: </span>
                                <span className="font-medium">42%</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Weight: </span>
                                <span className="font-medium">38%</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Container: 40ft High Cube</p>
                          </div>
                        </div>
                      </div>

                      {/* Orders Awaiting Consolidation */}
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-semibold text-orange-900 flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Orders Awaiting
                          </h3>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="bg-white p-3 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-orange-800">industrial machinery</span>
                              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">Ready</span>
                            </div>
                            <p className="text-sm text-gray-600">Supplier: atlas manufacturing</p>
                            <p className="text-sm text-gray-500">Value: $24,800</p>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-orange-800">automotive parts</span>
                              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">Ready</span>
                            </div>
                            <p className="text-sm text-gray-600">Supplier: euro automotive</p>
                            <p className="text-sm text-gray-500">Value: $18,950</p>
                          </div>
                        </div>
                      </div>

                      {/* Your Shipments */}
                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-semibold text-emerald-900 flex items-center">
                            <Truck className="mr-2 h-4 w-4" />
                            Your Shipments
                          </h3>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="bg-white p-3 rounded-lg border border-emerald-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-emerald-800">Consolidation: phoenix</span>
                              <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full">Delivered</span>
                            </div>
                            <p className="text-sm text-gray-600">Carrier: global express</p>
                            <p className="text-sm text-gray-500">Shipped: 18.11.2025</p>
                            <div className="mt-2 flex items-center space-x-4">
                              <button className="text-xs text-emerald-600 hover:text-emerald-800">Track →</button>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg border border-emerald-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-emerald-800">Consolidation: delta</span>
                              <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full">In Transit</span>
                            </div>
                            <p className="text-sm text-gray-600">Carrier: maritime logistics</p>
                            <p className="text-sm text-gray-500">Shipped: 05.12.2025</p>
                            <div className="mt-2 flex items-center space-x-4">
                              <button className="text-xs text-emerald-600 hover:text-emerald-800">Track →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Activity */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Live Activity
                      </h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>• Payment processed for Order #INV-2847 - $12,450</p>
                        <p>• New supplier inquiry from "premium textiles"</p>
                        <p>• Consolidation "atlas-europe" capacity updated to 42%</p>
                      </div>
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
