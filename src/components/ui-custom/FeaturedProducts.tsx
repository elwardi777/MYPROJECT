import { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  category: string;
  image: string;
  brand?: string;
  size?: string;
  condition?: string;
}

const FeaturedProducts = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [priceFilter, setPriceFilter] = useState<'all' | 'low-to-high' | 'high-to-low'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json(); // On récupère directement le JSON ici
        console.log('Fetched Products:', data);
    
        if (data.success && Array.isArray(data.products)) {
          // Assure-toi que tu utilises le bon champ "products"
          const formattedProducts = data.products.map((item: any) => ({
            id: item.id,
            title: item.name || 'Untitled Product',
            description: item.description || '',
            price: Number(item.price) || 0,
            discountedPrice: Number(item.discountedPrice) || 0,
            category: item.category || 'all',
            image: item.image || 'https://images.unsplash.com/photo-1578932750356-9652b4a27976',
            brand: item.brand || 'Unknown Brand',
            size: item.size || 'N/A',
            condition: item.condition || 'New',
          }));
          setProducts(formattedProducts);
          setLoaded(true);
        } else {
          throw new Error('Unexpected response structure: Data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  let filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === activeCategory.toLowerCase());

  if (priceFilter === 'low-to-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const aPrice = a.discountedPrice > 0 ? a.discountedPrice : a.price;
      const bPrice = b.discountedPrice > 0 ? b.discountedPrice : b.price;
      return aPrice - bPrice;
    });
  } else if (priceFilter === 'high-to-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const aPrice = a.discountedPrice > 0 ? a.discountedPrice : a.price;
      const bPrice = b.discountedPrice > 0 ? b.discountedPrice : b.price;
      return bPrice - aPrice;
    });
  }

  return (
    <section id="featured-products" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-start md:items-center mb-12 transition-all duration-500",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div>
            <h2 className="text-3xl font-bold mb-2 text-secondary">Featured Products</h2>
            <p className="text-muted-foreground">Discover our most popular items this season</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <button
              className="p-2 rounded-full border hover:bg-secondary/20 transition-colors"
              aria-label="Filters"
              title="Filter by price"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pb-4 mb-8 transition-all duration-500">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-secondary/20 hover:bg-secondary/40 text-secondary-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {showFilters && (
            <div className="w-full mt-4 flex flex-wrap gap-2 animate-fade-in">
              <span className="text-sm font-medium text-muted-foreground flex items-center">Price:</span>
              <button
                onClick={() => setPriceFilter('all')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  priceFilter === 'all'
                    ? "bg-primary text-white"
                    : "bg-secondary/20 hover:bg-secondary/40 text-secondary-foreground"
                )}
              >
                All Prices
              </button>
              <button
                onClick={() => setPriceFilter('low-to-high')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  priceFilter === 'low-to-high'
                    ? "bg-primary text-white"
                    : "bg-secondary/20 hover:bg-secondary/40 text-secondary-foreground"
                )}
              >
                Price: Low to High
              </button>
              <button
                onClick={() => setPriceFilter('high-to-low')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  priceFilter === 'high-to-low'
                    ? "bg-primary text-white"
                    : "bg-secondary/20 hover:bg-secondary/40 text-secondary-foreground"
                )}
              >
                Price: High to Low
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="text-xl text-muted-foreground mt-4">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-xl text-destructive">{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className={cn(
                "transition-all duration-500",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;