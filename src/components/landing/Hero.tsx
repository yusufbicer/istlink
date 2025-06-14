
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/lib/auth';
import { MessageSquare, Network, Activity, TrendingUp, GitMerge, Truck, Package, Users, BarChart2, Archive, CreditCard, Timer, Database, Bell, FileText, CheckCircle, AlertCircle, Clock, DollarSign } from 'lucide-react';
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
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-6 md:pt-32 md:pb-8 overflow-hidden relative bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced background gradients and effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-100/40 via-transparent to-transparent opacity-60" />
      <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-blue-200 to-lavender-200 rounded-full filter blur-3xl opacity-20 animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full filter blur-3xl opacity-15 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center mb-4 md:mb-6">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block py-2 px-4 text-xs md:text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4 md:mb-6 border border-blue-200 shadow-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              ✨ {t('smartExportConsolidation')}
            </span>
          </div>
          
            <h1 
            className={`text-xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold md:font-normal leading-tight mb-3 md:mb-4 transition-all duration-1000 delay-100 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } text-gray-900`}
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <span className="block mb-2 font-bold">
              <span className="text-gray-900">{t('turkishSupplyChain')}</span> <span className="text-gray-700">{t('complexity')}</span>
            </span>
            <span className="block relative h-8 md:h-12 lg:h-16 xl:h-20 overflow-hidden">
              <span 
                className={`absolute inset-0 text-blue-900 font-semibold md:font-medium transition-all duration-700 ease-in-out ${
                  currentTextIndex === 0 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}
              >
                {alternatingTexts[i18n.language as keyof typeof alternatingTexts]?.[0] || alternatingTexts.en[0]}
              </span>
              <span 
                className={`absolute inset-0 text-gray-800 font-semibold md:font-medium transition-all duration-700 ease-in-out ${
                  currentTextIndex === 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                }`}
              >
                {alternatingTexts[i18n.language as keyof typeof alternatingTexts]?.[1] || alternatingTexts.en[1]}
              </span>
            </span>
          </h1>
          
          <div 
            className={`text-sm md:text-lg lg:text-xl mb-4 md:mb-6 max-w-4xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="leading-relaxed px-2 text-gray-700" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {t('heroDescription')}
            </p>
          </div>
          
          <div 
            className={`flex justify-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button asChild size="default" className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              <a href="https://cal.com/yusuf-bicer-8ytuyg" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" /> {t('talkToOurTeam')}
              </a>
            </Button>
          </div>
        
          
          <div 
            className={`mt-3 md:mt-4 relative mx-auto max-w-4xl transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="bg-slate-800 p-0.5 rounded-lg">
                <div className="rounded-lg overflow-hidden bg-white border-0">
                  <div className="relative bg-slate-100 px-2 pt-1.5 pb-1 flex items-center rounded-t-lg">
                    <div className="flex space-x-1 absolute left-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="mx-auto">
                      <div className="h-3 w-48 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Creative Mobile Dashboard */}
                  {isMobile ? (
                    <div className="bg-white text-slate-800 p-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center">
                          <BundleistLogo size="sm" className="mr-2" showText={false} />
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="relative">
                            <Bell className="h-3 w-3 text-slate-600" />
                            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-700 font-medium">
                            J
                          </div>
                        </div>
                      </div>
                      
                      {/* Live Activity Banner */}
                      <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-1.5 rounded-lg border border-blue-200 mb-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse mr-1.5"></div>
                            <span className="text-xs font-medium text-blue-700">
                              {i18n.language === 'tr' ? 'Canlı Konsolidasyon' : i18n.language === 'fr' ? 'Consolidation en Direct' : 'Live Consolidation'}
                            </span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                            {i18n.language === 'tr' ? 'Aktif' : i18n.language === 'fr' ? 'Actif' : 'Active'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Active Consolidation with Suppliers */}
                      <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 shadow-sm mb-1.5">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <GitMerge className="h-2.5 w-2.5 text-slate-600 mr-1" />
                            <span className="text-xs font-medium">IST-CON-2025-041</span>
                          </div>
                          <span className="text-xs bg-slate-100 text-slate-700 px-1 py-0.5 rounded-full font-medium">
                            {i18n.language === 'tr' ? '%75 Dolu' : i18n.language === 'fr' ? '75% Plein' : '75% Full'}
                          </span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-slate-200">
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <div className="text-xs font-medium">Istanbul → Matadi</div>
                              <div className="text-[10px] text-slate-600 font-medium">
                                {i18n.language === 'tr' ? 'Kalkış: 15 Nis 2025' : i18n.language === 'fr' ? 'Départ: 15 Avr 2025' : 'Departure: Apr 15, 2025'}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-medium text-slate-700">$47,850</div>
                              <div className="text-[10px] text-slate-500">
                                {i18n.language === 'tr' ? 'Toplam Değer' : i18n.language === 'fr' ? 'Valeur Totale' : 'Total Value'}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-1 text-center">
                            <div className="text-[10px]">
                              <div className="font-bold">28</div>
                              <div className="text-slate-500">
                                {i18n.language === 'tr' ? 'Sipariş' : i18n.language === 'fr' ? 'Commandes' : 'Orders'}
                              </div>
                            </div>
                            <div className="text-[10px]">
                              <div className="font-bold">4</div>
                              <div className="text-slate-500">
                                {i18n.language === 'tr' ? 'Tedarikçi' : i18n.language === 'fr' ? 'Fournisseurs' : 'Suppliers'}
                              </div>
                            </div>
                            <div className="text-[10px]">
                              <div className="font-bold">75%</div>
                              <div className="text-slate-500">
                                {i18n.language === 'tr' ? 'Dolu' : i18n.language === 'fr' ? 'Rempli' : 'Filled'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Suppliers Overview */}
                      <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 shadow-sm mb-1.5">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <Users className="h-2.5 w-2.5 text-slate-600 mr-1" />
                            <span className="text-xs font-medium">
                              {i18n.language === 'tr' ? 'Aktif Tedarikçiler' : i18n.language === 'fr' ? 'Fournisseurs Actifs' : 'Active Suppliers'}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded border border-slate-100 flex justify-between items-center">
                            <div>
                              <div className="text-xs font-medium">
                                {i18n.language === 'tr' ? 'Tekstil Plus Ltd' : i18n.language === 'fr' ? 'Textile Plus Ltée' : 'Textile Plus Ltd'}
                              </div>
                              <div className="text-[9px] text-slate-500">
                                {i18n.language === 'tr' ? '12 sipariş • $18,200' : i18n.language === 'fr' ? '12 commandes • $18,200' : '12 orders • $18,200'}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-2.5 w-2.5 text-emerald-600 mr-0.5" />
                              <span className="text-[9px] text-emerald-600">
                                {i18n.language === 'tr' ? 'Ödendi' : i18n.language === 'fr' ? 'Payé' : 'Paid'}
                              </span>
                            </div>
                          </div>
                          <div className="bg-white p-1 rounded border border-slate-100 flex justify-between items-center">
                            <div>
                              <div className="text-xs font-medium">
                                {i18n.language === 'tr' ? 'Makine Şirketi' : i18n.language === 'fr' ? 'Société de Machines' : 'Machinery Co'}
                              </div>
                              <div className="text-[9px] text-slate-500">
                                {i18n.language === 'tr' ? '8 sipariş • $15,420' : i18n.language === 'fr' ? '8 commandes • $15,420' : '8 orders • $15,420'}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-2.5 w-2.5 text-emerald-600 mr-0.5" />
                              <span className="text-[9px] text-emerald-600">
                                {i18n.language === 'tr' ? 'Ödendi' : i18n.language === 'fr' ? 'Payé' : 'Paid'}
                              </span>
                            </div>
                          </div>
                          <div className="bg-white p-1 rounded border border-slate-100 flex justify-between items-center">
                            <div>
                              <div className="text-xs font-medium">
                                {i18n.language === 'tr' ? 'Oto Parça A.Ş.' : i18n.language === 'fr' ? 'Pièces Auto Inc' : 'Auto Parts Inc'}
                              </div>
                              <div className="text-[9px] text-slate-500">
                                {i18n.language === 'tr' ? '5 sipariş • $9,630' : i18n.language === 'fr' ? '5 commandes • $9,630' : '5 orders • $9,630'}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-2.5 w-2.5 text-amber-500 mr-0.5" />
                              <span className="text-[9px] text-amber-600">
                                {i18n.language === 'tr' ? 'İşleniyor' : i18n.language === 'fr' ? 'Traitement' : 'Processing'}
                              </span>
                            </div>
                          </div>
                          <div className="bg-white p-1 rounded border border-slate-100 flex justify-between items-center">
                            <div>
                              <div className="text-xs font-medium">
                                {i18n.language === 'tr' ? 'Kimyasal Çözümler' : i18n.language === 'fr' ? 'Solutions Chimiques' : 'Chemical Solutions'}
                              </div>
                              <div className="text-[9px] text-slate-500">
                                {i18n.language === 'tr' ? '3 sipariş • $4,600' : i18n.language === 'fr' ? '3 commandes • $4,600' : '3 orders • $4,600'}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-2.5 w-2.5 text-emerald-600 mr-0.5" />
                              <span className="text-[9px] text-emerald-600">
                                {i18n.language === 'tr' ? 'Ödendi' : i18n.language === 'fr' ? 'Payé' : 'Paid'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Recent Activities & Notifications */}
                      <div className="bg-slate-50 rounded-lg border border-slate-200 p-1.5 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <Activity className="h-2.5 w-2.5 text-slate-600 mr-1" />
                            <span className="text-xs font-medium">
                              {i18n.language === 'tr' ? 'Son Aktiviteler' : i18n.language === 'fr' ? 'Activité Récente' : 'Recent Activity'}
                            </span>
                          </div>
                          <span className="px-1 py-0.5 bg-amber-100 text-amber-700 text-[9px] rounded-full font-medium">
                            {i18n.language === 'tr' ? '3 Yeni' : i18n.language === 'fr' ? '3 Nouveau' : '3 New'}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <div className="bg-white p-1 rounded border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></div>
                              <div>
                                <div className="text-[10px] font-medium">
                                  {i18n.language === 'tr' ? 'Ödeme alındı - Tekstil Plus' : i18n.language === 'fr' ? 'Paiement reçu - Textile Plus' : 'Payment received - Textile Plus'}
                                </div>
                                <div className="text-[9px] text-slate-500">
                                  {i18n.language === 'tr' ? '2 dakika önce' : i18n.language === 'fr' ? 'Il y a 2 minutes' : '2 min ago'}
                                </div>
                              </div>
                            </div>
                            <span className="text-[9px] text-emerald-600 font-medium">$18,200</span>
                          </div>
                          <div className="bg-white p-1 rounded border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></div>
                              <div>
                                <div className="text-[10px] font-medium">
                                  {i18n.language === 'tr' ? 'Yeni sipariş eklendi' : i18n.language === 'fr' ? 'Nouvelle commande ajoutée' : 'New order added'}
                                </div>
                                <div className="text-[9px] text-slate-500">
                                  {i18n.language === 'tr' ? '5 dakika önce' : i18n.language === 'fr' ? 'Il y a 5 minutes' : '5 min ago'}
                                </div>
                              </div>
                            </div>
                            <span className="text-[9px] text-slate-600 font-medium">+4 items</span>
                          </div>
                          <div className="bg-white p-1 rounded border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></div>
                              <div>
                                <div className="text-[10px] font-medium">
                                  {i18n.language === 'tr' ? 'Sevkiyat güncellendi' : i18n.language === 'fr' ? 'Expédition mise à jour' : 'Shipment updated'}
                                </div>
                                <div className="text-[9px] text-slate-500">
                                  {i18n.language === 'tr' ? '12 dakika önce' : i18n.language === 'fr' ? 'Il y a 12 minutes' : '12 min ago'}
                                </div>
                              </div>
                            </div>
                            <span className="text-[9px] text-slate-600 font-medium">75% full</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                     // Desktop dashboard with creative consolidation view
                     <div className="bg-white text-slate-800 p-3">
                       <div className="flex items-center justify-between mb-2.5">
                         <div className="flex items-center">
                           <BundleistLogo size="md" className="mr-3" showText={true} />
                         </div>
                         
                         <div className="flex space-x-1.5">
                           <div className="flex items-center px-2 py-1 bg-slate-600 text-white rounded-lg text-xs font-medium">
                             <Activity className="h-3 w-3 mr-1.5" /> 
                             {i18n.language === 'tr' ? 'Kontrol Paneli' : i18n.language === 'fr' ? 'Tableau de bord' : 'Dashboard'}
                           </div>
                           <div className="flex items-center px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                             <Package className="h-3 w-3 mr-1.5" /> 
                             {i18n.language === 'tr' ? 'Siparişler' : i18n.language === 'fr' ? 'Commandes' : 'Orders'}
                           </div>
                           <div className="flex items-center px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                             <GitMerge className="h-3 w-3 mr-1.5" /> 
                             {i18n.language === 'tr' ? 'Konsolidasyonlar' : i18n.language === 'fr' ? 'Consolidations' : 'Consolidations'}
                           </div>
                           <div className="flex items-center px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                             <Users className="h-3 w-3 mr-1.5" /> 
                             {i18n.language === 'tr' ? 'Tedarikçiler' : i18n.language === 'fr' ? 'Fournisseurs' : 'Suppliers'}
                           </div>
                           <div className="flex items-center px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs text-slate-700 font-medium relative">
                             <Bell className="h-3 w-3 mr-0" />
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-700">
                            J
                          </div>
                        </div>
                      </div>
                      
                      {/* Live Activity Banner */}
                      <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-2 rounded-lg border border-blue-200 mb-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2"></div>
                            <span className="text-sm font-medium text-blue-700">Live Consolidation Activity</span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">IST-CON-2025-041 Active</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-2">
                        {/* Active Consolidation Overview */}
                        <div className="col-span-8 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <GitMerge className="h-4 w-4 text-slate-600 mr-1.5" />
                              <span className="font-medium text-slate-700 text-sm">Active Consolidation: IST-CON-2025-041</span>
                            </div>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">75% Filled</span>
                          </div>
                          
                          <div className="bg-white p-2.5 rounded-lg border border-slate-100 mb-2">
                            <div className="grid grid-cols-4 gap-3 mb-2.5">
                              <div className="text-center">
                                <div className="text-lg font-bold text-slate-700">28</div>
                                <div className="text-xs text-slate-500">Total Orders</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-slate-700">4</div>
                                <div className="text-xs text-slate-500">Suppliers</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-slate-700">$47,850</div>
                                <div className="text-xs text-slate-500">Total Value</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-slate-700">Apr 15</div>
                                <div className="text-xs text-slate-500">Departure</div>
                              </div>
                            </div>
                            
                            <div className="mb-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500">Container Space (40ft)</span>
                                <span className="font-medium">75% Filled</span>
                              </div>
                              <div className="w-full bg-slate-200 h-2 rounded-full">
                                <div className="bg-slate-600 h-full rounded-full" style={{width: '75%'}}></div>
                              </div>
                            </div>
                            
                            <div className="text-xs text-slate-600">
                              <span className="font-medium">Route:</span> Istanbul Warehouse → Matadi Port, DRC
                            </div>
                          </div>
                          
                          {/* Suppliers in this consolidation */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex justify-between items-center mb-1">
                                <div className="font-medium text-xs">Textile Plus Ltd</div>
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              </div>
                              <div className="text-xs text-gray-600 mb-1">12 orders • $18,200</div>
                              <div className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full inline-block">Payment Complete</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex justify-between items-center mb-1">
                                <div className="font-medium text-xs">Machinery Co</div>
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              </div>
                              <div className="text-xs text-gray-600 mb-1">8 orders • $15,420</div>
                              <div className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full inline-block">Payment Complete</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex justify-between items-center mb-1">
                                <div className="font-medium text-xs">Auto Parts Inc</div>
                                <Clock className="h-3 w-3 text-orange-500" />
                              </div>
                              <div className="text-xs text-gray-600 mb-1">5 orders • $9,630</div>
                              <div className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full inline-block">Processing Payment</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex justify-between items-center mb-1">
                                <div className="font-medium text-xs">Chemical Solutions</div>
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              </div>
                              <div className="text-xs text-gray-600 mb-1">3 orders • $4,600</div>
                              <div className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full inline-block">Payment Complete</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Recent Activity & Notifications */}
                        <div className="col-span-4 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <Activity className="h-3 w-3 text-blue-600 mr-1.5" />
                              <span className="font-medium text-gray-700 text-sm">Live Activity</span>
                            </div>
                            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">5 New</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex items-center mb-0.5">
                                <FileText className="h-3 w-3 text-green-500 mr-1.5" />
                                <span className="text-xs font-medium">BOL Generated</span>
                              </div>
                              <div className="text-xs text-gray-600">Bill of Lading #BL-041-2025 created</div>
                              <div className="text-xs text-gray-500 mt-0.5">3 hours ago</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex items-center mb-0.5">
                                <DollarSign className="h-3 w-3 text-blue-500 mr-1.5" />
                                <span className="text-xs font-medium">Payment Processed</span>
                              </div>
                              <div className="text-xs text-gray-600">$18,200 to Textile Plus Ltd</div>
                              <div className="text-xs text-gray-500 mt-0.5">8 hours ago</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex items-center mb-0.5">
                                <Package className="h-3 w-3 text-purple-500 mr-1.5" />
                                <span className="text-xs font-medium">New Orders Added</span>
                              </div>
                              <div className="text-xs text-gray-600">5 orders from Auto Parts Inc</div>
                              <div className="text-xs text-gray-500 mt-0.5">2 days ago</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex items-center mb-0.5">
                                <CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5" />
                                <span className="text-xs font-medium">Documentation Complete</span>
                              </div>
                              <div className="text-xs text-gray-600">All export docs verified</div>
                              <div className="text-xs text-gray-500 mt-0.5">1 week ago</div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-lg border border-gray-100">
                              <div className="flex items-center mb-0.5">
                                <Truck className="h-3 w-3 text-orange-500 mr-1.5" />
                                <span className="text-xs font-medium">Warehouse Arrival</span>
                              </div>
                              <div className="text-xs text-gray-600">12 packages from Machinery Co</div>
                              <div className="text-xs text-gray-500 mt-0.5">3 weeks ago</div>
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
