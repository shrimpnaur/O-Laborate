
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Here you would normally send the email to your backend
    console.log('Subscribing email:', email);
    toast.success('Thanks for subscribing!');
    setEmail('');
  };
  
  return (
    <section className="py-12 bg-olabs-purple">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Subscribe to our content
          </h2>
          <p className="text-white/80 mb-6">
          "A hands-on experience that truly enhances our understanding."
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="bg-olabs-orange hover:bg-orange-600 text-white button-hover"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
