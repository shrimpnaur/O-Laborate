
import { Clock, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  duration: string;
  lessons: number;
  students: number;
}

const CourseCard = ({
  image,
  title,
  price,
  rating,
  category,
  duration,
  lessons,
  students
}: CourseCardProps) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FF9F1C" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FF9F1C" stroke="none">
          <defs>
            <linearGradient id="half" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#FF9F1C" />
              <stop offset="50%" stopColor="#E5E5E5" />
            </linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half)" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#E5E5E5" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3 bg-white text-xs font-semibold px-2 py-1 rounded-md">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex">{renderStars()}</div>
          <span className="text-olabs-orange font-bold"></span>
        </div>
        
        <h3 className="font-semibold text-lg mb-3">{title}</h3>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={14} className="mr-1" />
            <span>{lessons} Lessons</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>{students} Students</span>
          </div>
        </div>
        
        <Button className="w-full bg-olabs-orange hover:bg-orange-600 button-hover">
          Start Course
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
