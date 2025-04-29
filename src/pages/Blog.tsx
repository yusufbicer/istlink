
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { CalendarDays, Clock, ChevronRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How Consolidated Shipping is Revolutionizing Turkish Exports",
    excerpt: "Learn how businesses are reducing shipping costs by up to 35% through smart consolidation strategies.",
    date: "Apr 20, 2025",
    readTime: "8 min read",
    category: "Shipping",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "Yusuf Bicer",
      avatar: "/lovable-uploads/5f42e8b7-62b8-4bd7-a62c-26d9a0e5e938.png"
    }
  },
  {
    id: 2,
    title: "5 Ways to Optimize Your Supply Chain with Turkish Manufacturers",
    excerpt: "Discover the strategies leading importers use to streamline their sourcing process from Turkey.",
    date: "Apr 15, 2025",
    readTime: "6 min read",
    category: "Supply Chain",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "Ayse Yilmaz",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    }
  },
  {
    id: 3,
    title: "Navigating Customs: A Complete Guide to Turkish Export Documentation",
    excerpt: "Everything you need to know about customs clearance when importing from Turkey.",
    date: "Apr 10, 2025",
    readTime: "10 min read",
    category: "Compliance",
    image: "https://images.unsplash.com/photo-1569385210018-127685230c41?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "Mehmet Kaya",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  },
  {
    id: 4,
    title: "The Environmental Impact of Consolidated Shipping",
    excerpt: "How combining shipments is not just cost-effective but also better for the planet.",
    date: "Apr 5, 2025",
    readTime: "7 min read",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "Zeynep Demir",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    }
  },
  {
    id: 5,
    title: "Turkish Textile Exports: Market Trends for 2025",
    excerpt: "Analysis of the growing Turkish textile industry and opportunities for global buyers.",
    date: "Mar 30, 2025",
    readTime: "9 min read",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "Ali Yildirim",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    id: 6,
    title: "Case Study: How GROOP Helped a Fashion Retailer Save $120K Annually",
    excerpt: "Real-world example of optimized shipping and supplier management with measurable results.",
    date: "Mar 25, 2025",
    readTime: "5 min read",
    category: "Case Study",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "Yusuf Bicer",
      avatar: "/lovable-uploads/5f42e8b7-62b8-4bd7-a62c-26d9a0e5e938.png"
    }
  }
];

// Filter categories from blog posts
const categories = Array.from(new Set(blogPosts.map(post => post.category)));

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <>
      <Header />
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div 
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="inline-block py-1 px-3 text-sm font-medium bg-lavender-100 text-metallic-blue rounded-full mb-3">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insights on Cross-Border Commerce
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert analysis, industry trends, and practical tips for optimizing your Turkish supply chain.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === "All" 
                    ? "bg-metallic-blue text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Posts
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category 
                      ? "bg-metallic-blue text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article 
                key={post.id}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <span className="text-sm font-medium">
                      {post.author.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-metallic-blue font-medium hover:underline"
                    >
                      Read Article
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Want to stay updated with our latest insights?</p>
            <Link 
              to="/early-access"
              className="inline-block bg-metallic-blue hover:bg-metallic-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Subscribe to Our Newsletter
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
