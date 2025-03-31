
import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { BarChart2 } from 'lucide-react';

const Analytics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-xl bg-blue-100 mb-6">
              <BarChart2 className="h-10 w-10 text-metallic-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Analytics</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get detailed insights and analytics on your shipments, costs, and efficiency. Make data-driven decisions to optimize your supply chain.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              Our advanced analytics dashboard is under development. 
              Check back soon for comprehensive shipping metrics, cost analysis, and performance reports.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
