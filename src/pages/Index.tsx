import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import SimplifiedHero from '@/components/landing/SimplifiedHero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PackageCheck, FileText, Receipt } from 'lucide-react';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <SimplifiedHero />
        <Features />
        <HowItWorks />
        
        {/* Blog Preview Section */}
        <section id="blog" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
                Our Blog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest Insights & News
              </h2>
              <p className="text-xl text-gray-600">
                Stay updated with the latest trends and tips in cross-border commerce.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
              <Link to="/blog" className="inline-flex items-center px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                View All Articles
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Updated Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block py-1 px-3 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Flexible Consolidation Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Transparent pricing designed to scale with your business needs. Pay only for what you use.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First Trial */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:transform hover:-translate-y-1 hover:shadow-md">
                <div className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <PackageCheck className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">First Trial</h3>
                  <p className="text-gray-600 mb-4">Perfect for testing our services</p>
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold">$299</span>
                    <span className="text-gray-600 ml-1">flat rate</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-5">Plus bank fees</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>All consolidation services</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Shipping consolidation</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Document handling</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Payment processing</span>
                    </li>
                  </ul>
                  <a href="/register" className="block w-full py-2 px-4 bg-white border border-blue-600 text-blue-600 rounded-lg text-center font-medium hover:bg-blue-50 transition-colors">
                    Get Started
                  </a>
                </div>
              </div>
              
              {/* Regular Service */}
              <div className="bg-white rounded-xl border-2 border-blue-500 shadow-md overflow-hidden transform scale-105 z-10 transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-blue-600 text-white py-2 px-6 text-center text-sm font-medium">
                  MOST POPULAR
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Regular Service</h3>
                  <p className="text-gray-600 mb-4">Ideal for growing businesses</p>
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold">2%</span>
                    <span className="text-gray-600 ml-1">of order value</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-5">Maximum $999 plus bank fees</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>All consolidation services</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Prioritized handling</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Advanced tracking</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Supplier management</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <a href="/register" className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors">
                    Get Started
                  </a>
                </div>
              </div>
              
              {/* Volume Discount */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Receipt className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Volume Discount</h3>
                  <p className="text-gray-600 mb-4">For 10+ consolidations yearly</p>
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold">1.5%</span>
                    <span className="text-gray-600 ml-1">of order value</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-5">Maximum $699 plus bank fees</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>All regular features</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Volume-based pricing</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Custom analytics</span>
                    </li>
                  </ul>
                  <a href="/register" className="block w-full py-2 px-4 bg-white border border-blue-600 text-blue-600 rounded-lg text-center font-medium hover:bg-blue-50 transition-colors">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            
            {/* Enterprise custom solution */}
            <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Need a Custom Solution?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                For high-volume businesses with specific requirements, we offer tailor-made enterprise solutions with additional discounts.
              </p>
              <a href="#" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Simplify Your Cross-Border Procurement?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Join thousands of businesses that trust ShipSync for their Turkish import operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Get Started Free
              </a>
              <a href="#how-it-works" className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
