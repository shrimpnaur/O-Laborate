import { useEffect, useRef } from "react";

const PremiumExperience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-active");
          }
        });
      },
      { threshold: 0.2 }
    );

    const children = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    if (children) {
      children.forEach((child) => observer.observe(child));
    }

    return () => {
      if (children) {
        children.forEach((child) => observer.unobserve(child));
      }
    };
  }, []);

  return (
    <section className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative animate-on-scroll opacity-0 transition-opacity duration-700 ease-out">
            <img
              src="/lovable-uploads/2287d867-fac5-464b-bf1a-3558b35c58dc.png"
              alt="Student using computer"
              className="w-full max-w-lg mx-auto"
            />
          </div>

          {/* Text Section */}
          <div className="animate-on-scroll opacity-0 transition-opacity duration-700 ease-out">
            <h2 className="text-3xl font-bold mb-2">
              Premium <span className="text-olabs-orange">Learning</span> <br />
              Experience
            </h2>

            <div className="space-y-6 mt-8">
              {/* Feature 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-olabs-purple rounded-lg flex items-center justify-center">
                  ✅
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Easily Accessible</h3>
                  <p className="text-gray-600 text-sm">
                    Learning is comfortable with Courslab.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-olabs-purple rounded-lg flex items-center justify-center">
                  🎉
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Fun learning experience</h3>
                  <p className="text-gray-600 text-sm">
                    Enjoy an engaging learning journey.
                  </p>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
