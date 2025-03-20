
import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
              Our Blog
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Latest News and Insights
            </h1>
            <p className="text-xl text-gray-600">
              Explore the latest trends, tips, and success stories in consolidation shipping from Turkey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="h-48 overflow-hidden">
                <img src="/placeholder.svg" alt="Blog Post" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-500">May 15, 2023</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-blue-600">Shipping</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Understanding Turkish Export Regulations in 2023</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to navigating the complex export regulations for goods leaving Turkey.
                </p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                  Read More →
                </a>
              </div>
            </div>
            
            {/* Blog Post 2 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="h-48 overflow-hidden">
                <img src="/placeholder.svg" alt="Blog Post" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-500">April 28, 2023</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-blue-600">Consolidation</span>
                </div>
                <h3 className="text-xl font-bold mb-2">5 Ways to Reduce Shipping Costs with Consolidation</h3>
                <p className="text-gray-600 mb-4">
                  Learn how businesses are saving up to 40% on shipping costs by implementing strategic consolidation techniques.
                </p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                  Read More →
                </a>
              </div>
            </div>
            
            {/* Blog Post 3 */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="h-48 overflow-hidden">
                <img src="/placeholder.svg" alt="Blog Post" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-500">April 10, 2023</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-blue-600">Success Story</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Case Study: How Company XYZ Optimized Their Supply Chain</h3>
                <p className="text-gray-600 mb-4">
                  Real-world example of how a furniture retailer transformed their Turkish imports with our consolidation services.
                </p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                  Read More →
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">More articles coming soon! Subscribe to our newsletter to stay updated.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
