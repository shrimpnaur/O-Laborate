
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-olabs-cream">
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for doesn't exist or has been moved."
      />
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-olabs-purple text-9xl font-bold mb-4 animate-float">404</div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved. 
            Please check the URL or navigate back to the homepage.
          </p>
          <Link to="/">
            <Button className="bg-olabs-purple hover:bg-olabs-light-purple button-hover px-8">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
