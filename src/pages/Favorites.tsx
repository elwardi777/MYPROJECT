
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import ProductCard from '@/components/ui-custom/ProductCard';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/lib/data';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      setIsLoading(true);
      try {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites);
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        toast({
          title: "Error",
          description: "Failed to load favorite products.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  return (
    <>
      <Helmet>
        <title>My Favorite Products | VintedMaghreb</title>
        <meta name="description" content="View your saved favorite products on VintedMaghreb" />
      </Helmet>
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl font-bold mb-4">My Favorite Products</h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">You haven't saved any products yet</p>
              <p>Browse our products and click the heart icon to add items to your favorites</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {favorites.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Favorites;
