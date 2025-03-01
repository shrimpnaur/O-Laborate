
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Track {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
}

const Tracks = () => {
  const tracks: Track[] = [
    {
      id: 1,
      name: "Mathematics",
      description: "Learn advanced mathematical concepts with interactive simulations",
      icon: "📐",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Language",
      description: "Master new languages with AI-powered conversation practice",
      icon: "🗣️",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Science",
      description: "Explore scientific concepts through virtual experiments",
      icon: "🧪",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Social Science",
      description: "Understand complex social concepts through interactive scenarios",
      icon: "🌍",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Computer",
      description: "Build practical coding skills with hands-on projects",
      icon: "💻",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "3D/AR/VR",
      description: "Create immersive experiences with cutting-edge technologies",
      icon: "🥽",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "EDP",
      description: "Develop entrepreneurial skills through practical business simulations",
      icon: "📊",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      name: "ISL",
      description: "Learn Indian Sign Language with interactive video lessons",
      icon: "👐",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      name: "Robotics",
      description: "Build and program robots with virtual simulations",
      icon: "🤖",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const tracksPerPage = 3;
  const totalPages = Math.ceil(tracks.length / tracksPerPage);

  const nextSlide = () => {
    if (currentIndex < (totalPages - 1) * tracksPerPage) {
      setCurrentIndex(prev => prev + tracksPerPage);
    } else {
      setCurrentIndex(0); // Loop back to the beginning
    }
  };

  const prevSlide = () => {
    if (currentIndex >= tracksPerPage) {
      setCurrentIndex(prev => prev - tracksPerPage);
    } else {
      setCurrentIndex((totalPages - 1) * tracksPerPage); // Loop to the end
    }
  };

  const visibleTracks = tracks.slice(currentIndex, currentIndex + tracksPerPage);

  return (
    <section className="py-16 bg-olabs-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold relative">
              Our Tracks
              <img 
                src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none'%3E%3Cpath d='M30.9959 1.16324C23.4671 11.5436 11.1378 26.0713 2.32484 26.0713C0.85999 26.0713 0.00291443 25.1927 0.00291443 23.9361C0.00291443 20.1243 9.84798 14.1069 22.1763 3.53279C9.41449 13.1478 0.00291443 19.0215 0.00291443 12.5244C0.00291443 9.37936 2.7611 7.48068 7.84834 7.48068C19.7463 7.48068 31.4293 -1.85823 30.9959 1.16324Z' fill='%23FF6B00'/%3E%3C/svg%3E" 
                alt="" 
                className="absolute -top-6 -right-8 w-12 h-12 animate-float"
              />
            </h2>
            <p className="text-gray-600 mt-1">To our students who are finding their way through their topics</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              aria-label="Previous tracks"
              className="p-2 rounded-full border border-gray-300 hover:bg-olabs-purple hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next tracks"
              className="p-2 rounded-full border border-gray-300 hover:bg-olabs-purple hover:text-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTracks.map((track, index) => (
            <div 
              key={track.id}
              className="bg-white rounded-xl overflow-hidden shadow-md animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative">
                <img 
                  src={track.image} 
                  alt={track.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-olabs-orange px-2 py-1 rounded text-xs font-semibold">
                    {track.icon} {track.name}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{track.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{track.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="inline-block w-6 h-6 rounded-full bg-pink-100"></span>
                    <span className="inline-block w-6 h-6 rounded-full bg-blue-100"></span>
                    <span className="inline-block w-6 h-6 rounded-full bg-green-100"></span>
                  </div>
                  <Button variant="ghost" className="text-olabs-orange hover:text-olabs-orange hover:bg-orange-50">
                    Explore Track
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 mx-1 rounded-full ${
                Math.floor(currentIndex / tracksPerPage) === i 
                  ? 'bg-olabs-purple w-6' 
                  : 'bg-gray-300'
              } transition-all duration-300`}
              onClick={() => setCurrentIndex(i * tracksPerPage)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
