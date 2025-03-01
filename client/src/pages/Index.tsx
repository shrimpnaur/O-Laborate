import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesBox from '@/components/FeaturesBox';
import Tracks from '@/components/Tracks';
import PremiumExperience from '@/components/PremiumExperience';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import SEO from '@/components/SEO';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from 'sonner';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      toast({
        title: "Welcome to O-Laborate",
        description: "Explore our courses and start your learning journey today.",
      });
    }
  }, [loading, toast]);

  const featuredCourses = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80',
      title: 'UI/UX Design for Beginners',
      price: 99,
      rating: 4.8,
      category: 'UI/UX Design',
      duration: '22hr 30min',
      lessons: 34,
      students: 200
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
      title: 'Web Development Bootcamp',
      price: 149,
      rating: 4.9,
      category: 'Development',
      duration: '35hr 15min',
      lessons: 48,
      students: 350
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      title: 'Data Science Fundamentals',
      price: 129,
      rating: 4.7,
      category: 'Data Science',
      duration: '28hr 45min',
      lessons: 42,
      students: 290
    }
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-olabs-cream">
        <div
          className="w-16 h-16 border-4 border-olabs-purple border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading..."
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-olabs-cream">
      <SEO 
        title="Home" 
        description="O-Labs is a global training provider that specializes in accredited and bespoke training courses across various disciplines."
      />
      <Navbar />
      <Toaster />
      <Hero />
      <FeaturesBox />
      <Tracks /> 

      {/* Featured Courses Section */}
      <section className="py-12 bg-olabs-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <p className="text-gray-600 mt-1">Explore our most popular learning programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="bg-transparent border-2 border-olabs-purple text-olabs-purple py-2 px-6 rounded-full hover:bg-olabs-purple hover:text-white transition-colors duration-300 font-medium"
              aria-label="View all courses"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>

      <PremiumExperience />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
