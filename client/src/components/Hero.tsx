
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
    // Implement search functionality here
  };

  return (
    <section className="pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-olabs-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              The <span className="text-olabs-orange">Smart</span> <br />
              Choice For <span className="text-olabs-orange">Future</span>
            </h1>
            <p className="text-gray-600 mb-6 max-w-md">
            OLabs is a leading global provider of innovative training solutions, 
            offering accredited and tailored courses that empower individuals and organizations to excel in their fields.
            </p>

            <form onSubmit={handleSearch} className="flex mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Start with a query..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-olabs-purple/50"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="bg-olabs-purple hover:bg-olabs-light-purple rounded-r-lg rounded-l-none button-hover"
              >
                Continue
              </Button>
            </form>
          </div>

          <div className="relative animate-fade-in animation-delay-300">
            <img
              src="/lovable-uploads/530f66bf-2e6a-44ba-9c74-cc0893319b05.png"
              alt="Online Learning Illustration"
              className="w-full h-auto max-w-2xl mx-auto animate-float"
            />
            
            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 w-16 h-16 bg-olabs-cream rounded-full shadow-md p-2 animate-float" style={{animationDelay: '1s'}}>
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-olabs-purple text-xl font-bold">?</span>
              </div>
            </div>
            
            <div className="absolute -bottom-5 left-10 w-14 h-14 bg-olabs-cream rounded-full shadow-md animate-float" style={{animationDelay: '2s'}}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-olabs-orange text-xl font-bold">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
