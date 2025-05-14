
import { useEffect } from 'react';
import Navbar from '@/components/ui-custom/Navbar';
import Hero from '@/components/ui-custom/Hero';
import FeaturedProducts from '@/components/ui-custom/FeaturedProducts';
import Footer from '@/components/ui-custom/Footer';

const Index = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
