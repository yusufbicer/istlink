
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock blog data - will be replaced when blog functionality is implemented
const mockBlogPosts = [
  {
    id: '1',
    title: 'How to Optimize Your Turkish Supply Chain for Maximum Efficiency',
    excerpt: 'Discover proven strategies to streamline your Turkish sourcing operations and reduce costs.',
    date: '2024-12-15',
    slug: 'optimize-turkish-supply-chain'
  },
  {
    id: '2',
    title: 'The Complete Guide to Consolidation Services in International Trade',
    excerpt: 'Learn how consolidation can save you up to 50% on shipping costs while simplifying logistics.',
    date: '2024-12-10',
    slug: 'consolidation-services-guide'
  },
  {
    id: '3',
    title: 'Turkey Trade Regulations 2024: What Importers Need to Know',
    excerpt: 'Stay compliant with the latest Turkish trade regulations and documentation requirements.',
    date: '2024-12-05',
    slug: 'turkey-trade-regulations-2024'
  }
];

const BlogPreview = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`${isMobile ? 'py-8' : 'py-12'} bg-white border-t border-gray-100`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Latest Insights
          </h2>
          <p className="text-gray-600 text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Stay updated with supply chain trends and best practices
          </p>
        </div>

        {isMobile ? (
          // Mobile: Single column, compact cards
          <div className="space-y-4">
            {mockBlogPosts.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-2 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Desktop/Tablet: Three columns
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockBlogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
              >
                <h3 className="font-semibold text-sm text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            View all articles
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
