
import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Archive } from 'lucide-react';

const Suppliers = () => {
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
              <Archive className="h-10 w-10 text-metallic-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Supplier Management</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage and track all your Turkish suppliers in one place. Simplify your procurement process with our centralized supplier management system.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              Our comprehensive supplier management system is under development. 
              Check back soon for advanced supplier tracking, performance analytics, and more.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Suppliers;
