import { useEffect, useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { PackageCheck, FileText, Receipt, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Scroll to section if hash is present in URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const pricingPlans = [
    {
      name: "Starter",
      price: "$499",
      period: "One-time fee",
      description: "Perfect for first-time users exploring Turkish supply chain services",
      additionalInfo: "+ Bank transfer fees",
      icon: PackageCheck,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      features: [
        "Single consolidated shipment",
        "Supplier payment handling",
        "Single Bill of Lading",
        "Documentation support"
      ]
    },
    {
      name: "Growth",
      price: "2%",
      period: "Of the total order value",
      description: "Our most popular option for growing businesses with regular shipments",
      additionalInfo: "+ Bank transfer fees",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      features: [
        "Multiple consolidated shipments",
        "Digital procurement dashboard",
        "Real-time tracking",
        "Preferred shipping rates",
        "Payment handling & protection"
      ]
    },
    {
      name: "Enterprise",
      price: "1.5%",
      period: "After 5 consolidations/month",
      description: "For businesses with high-volume international shipping needs",
      additionalInfo: "Volume-based discounting after 5 consolidations/month",
      icon: Receipt,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      features: [
        "Volume discount pricing",
        "Priority consolidation",
        "Customized shipping schedule",
        "Advanced analytics & reporting",
        "Warehouse storage options",
        "Strategic sourcing assistance"
      ]
    }
  ];

  // New concise and relevant testimonials
  const testimonials = [
    {
      name: "Alex Rodriguez",
      company: "Global Logistics Inc.",
      quote: "GROOP transformed our international shipping process, cutting costs by 35% and reducing paperwork significantly.",
      role: "Operations Director"
    },
    {
      name: "Maria Chen",
      company: "TechGrow Startups",
      quote: "Their consolidation service is a game-changer. We've simplified our supply chain and improved our global sourcing efficiency.",
      role: "Procurement Manager"
    },
    {
      name: "David Thompson",
      company: "EcoSupply Solutions",
      quote: "GROOP's platform provides transparency and cost-effectiveness we've never experienced before in international shipping.",
      role: "Founder & CEO"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Existing sections... */}
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from businesses that have transformed their supply chain
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">
                    <CheckCircle2 className="h-8 w-8 text-metallic-blue mb-3" />
                    <p className="text-gray-700 italic mb-4">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Index;
