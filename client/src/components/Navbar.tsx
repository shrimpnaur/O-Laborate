import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-olabs-cream shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-olabs-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="font-bold text-xl">O-Laborative</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-olabs-purple transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-olabs-purple transition-colors">
              About us
            </Link>
            <Link to="/courses" className="text-sm font-medium hover:text-olabs-purple transition-colors">
              Courses
            </Link>
            <a href="https://mcqgenerator-olabs.streamlit.app/"  rel="noopener noreferrer" className="text-sm font-medium hover:text-olabs-purple transition-colors">
              AI-MCQs
            </a>
            <Link to="/services" className="text-sm font-medium hover:text-olabs-purple transition-colors">
              Our Service
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-olabs-purple transition-colors">
              Contact us
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-olabs-purple transition-colors">
              White-Board
            </Link>
            <Button className="bg-olabs-purple hover:bg-olabs-light-purple button-hover">
              Sign in
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-olabs-purple"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium hover:text-olabs-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-olabs-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                to="/courses"
                className="text-sm font-medium hover:text-olabs-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <a
                href="https://mcqgenerator-olabs.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-olabs-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI-MCQs
              </a>
              <a
                href="https://ytsummarizer-olabs.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-olabs-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Discussions
              </a>
              <Link
                to="/services"
                className="text-sm font-medium hover:text-olabs-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Service
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-olabs-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
              </Link>
              <Button
                className="bg-olabs-purple hover:bg-olabs-light-purple w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
