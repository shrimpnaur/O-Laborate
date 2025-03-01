
import { Monitor, Briefcase, Award } from 'lucide-react';

const FeaturesBox = () => {
  const features = [
    {
      icon: <Monitor size={28} className="text-white" />,
      title: "Master New Topics Using Latest Technologies",
      description: "Stay ahead of the curve with the latest tools and techniques in interactive learning and practical applications."
    },
    {
      icon: <Briefcase size={28} className="text-white" />,
      title: "Prepare for Your Future Career",
      description: "Gain the skills and knowledge that employers value through immersive, hands-on experiences in your field of interest."
    },
    {
      icon: <Award size={28} className="text-white" />,
      title: "Earn Industry-Recognized Certifications",
      description: "Showcase your expertise and unlock career opportunities with activities that validate your skills and achievements."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto -mt-15.5 z-10 relative px-4">
      <div className="bg-olabs-purple rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`p-6 flex items-start space-x-4 ${
              index !== features.length - 1 ? 'md:border-r md:border-purple-700' : ''
            } fade-in ${`stagger-${index + 1}`}`}
          >
            <div className="flex-shrink-0 bg-olabs-light-purple p-3 rounded-lg">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBox;
