
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Finley Kirk",
      role: "Web Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Teachings of the great explore of truth, the master-builder of human happiness. no one rejects,dislikes, or avoids pleasure itself, pleasure itself."
    },
    {
      id: 2,
      name: "Dannette P. Cervantes",
      role: "Web Design",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Complete account of the system and expound the actual Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots."
    },
    {
      id: 3,
      name: "Clara B. Altman",
      role: "UX/UI Designer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour."
    },
    {
      id: 4,
      name: "Marcus J. Chambers",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections from classical literature."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Student's Say</h2>
          <p className="text-gray-600 mt-1">From thousands who have benefited for the many who have contributed. </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`w-full flex-shrink-0 transition-all duration-500 ease-in-out ${
                    index === activeIndex ? 'opacity-100 transform scale-100' : 'opacity-0 absolute'
                  }`}
                  style={{
                    transform: `translateX(${(index - activeIndex) * 100}%)`,
                  }}
                >
                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-olabs-purple"
                      />
                      <div className="ml-3">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-6 bg-olabs-purple' : 'bg-gray-300'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300 hidden md:block"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300 hidden md:block"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
