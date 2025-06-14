
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import SEOHead from '@/components/SEO/SEOHead';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead 
        title="Page Not Found | Bundleist"
        description="The page you're looking for doesn't exist. Return to Bundleist's Turkish export consolidation platform."
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-200 mb-6">404</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link to="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="text-sm text-gray-500">
            <span>Need help? </span>
            <button className="text-blue-600 hover:text-blue-800">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotFound;
