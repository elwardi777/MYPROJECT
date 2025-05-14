import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const scrollToFeaturedProducts = () => {
  const featuredProductsSection = document.getElementById('featured-products');
  if (featuredProductsSection) {
    featuredProductsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  const { toast } = useToast();

  const [loaded, setLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const styleTexts = ["Style Match", "Fashion Find", "Sustainable Style", "Perfect Look"];
  const textRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  // check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/current-user', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true); // true if user exists
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    setTimeout(() => setLoaded(true), 100);

    // text animation
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '0';
        textRef.current.style.transform = 'translateY(10px)';

        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % styleTexts.length);
          if (textRef.current) {
            textRef.current.style.opacity = '1';
            textRef.current.style.transform = 'translateY(0)';
          }
        }, 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleShopping = () => {
    if (isAuthenticated) {
      scrollToFeaturedProducts();
    } else {
      scrollToFeaturedProducts();
    }
  };

  const handleSell = () => {
    if (isAuthenticated) {
      navigate('/sell');
    } else {
      toast({
        title: "Authentication required",
        description: "Please login or create an account to add items to your cart.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "transition-all duration-700 delay-100 transform",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Sustainable Fashion
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block mb-2">Find Your Perfect</span>
              <span
                ref={textRef}
                className="block text-primary transition-all duration-500"
              >
                {styleTexts[textIndex]}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Discover unique pre-loved fashion, sell your own clothes, and join a community that values sustainability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 sm:flex-initial" onClick={handleShopping}>
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="group flex-1 sm:flex-initial" onClick={handleSell}>
                Sell Items
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className={cn(
            "relative transition-all duration-700 delay-300 transform",
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/PFE.webp"
                alt="Fashion Model"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="glass rounded-xl p-4 backdrop-blur-md max-w-xs mx-auto md:ml-0 md:mr-auto">
                  <p className="text-sm font-medium mb-2">Featured Collection</p>
                  <h3 className="text-xl font-bold mb-1">Pre-loved treasures</h3>
                  <p className="text-xs text-muted-foreground">Fresh looks</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-44 md:h-44 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-36 md:h-36 bg-secondary rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
