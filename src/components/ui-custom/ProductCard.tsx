import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Button from './Button';

// Define ProductCardProps interface for type safety
interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsLiked(favorites.some((fav: Product) => fav.id === product.id));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, [product.id]);

  // Toggle favorite status
  const toggleLike = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isCurrentlyLiked = favorites.some((fav: Product) => fav.id === product.id);

      if (isCurrentlyLiked) {
        const updatedFavorites = favorites.filter((fav: Product) => fav.id !== product.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast({
          title: 'Removed from favorites',
          description: `${product.title} has been removed from your favorites.`,
        });
      } else {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        toast({
          title: 'Added to favorites',
          description: `${product.title} has been added to your favorites.`,
        });
      }

      setIsLiked(!isCurrentlyLiked);
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to update favorites. Please try again.',
        variant: 'destructive',
      });
    }
  }, [product]);

  // Check authentication and add to cart
  const checkAuthAndAddToCart = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/current-user', {
        credentials: 'include',
      });

      if (!res.ok) {
        setShowAuthDialog(true);
        return;
      }

      await res.json(); // Parse user data if needed
      addToCart(product);
      toast({
        title: 'Added to cart',
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      setShowAuthDialog(true);
    }
  }, [addToCart, product]);

  // Handle add to cart button click
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    checkAuthAndAddToCart();
  };

  // Navigation handlers
  const handleGoToLogin = () => {
    setShowAuthDialog(false);
    navigate('/auth/login');
  };

  const handleGoToRegister = () => {
    setShowAuthDialog(false);
    navigate('/auth/register');
  };

  // Safely parse price and discountedPrice
  const price = Number.parseFloat(String(product.price)) || 0;
  const discountedPrice = Number.parseFloat(String(product.discountedPrice)) || 0;
  const discountPercentage =
    price > 0 && discountedPrice > 0 ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className={cn(
          'group relative flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <div className="w-8 h-8 border-2 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.title}
            className={cn(
              'object-cover w-full h-full transition-transform duration-500',
              imageLoaded ? 'opacity-100' : 'opacity-0',
              isHovered ? 'scale-105' : 'scale-100',
            )}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1578932750356-9652b4a27976';
            }}
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              className={cn(
                'p-2 rounded-full transition-all duration-300',
                isLiked ? 'bg-red-100' : 'bg-white/80 backdrop-blur-sm',
              )}
              onClick={toggleLike}
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={cn(
                  'w-5 h-5 transition-colors',
                  isLiked ? 'fill-red-500 text-red-500' : 'fill-transparent text-gray-600',
                )}
              />
            </button>
            <button
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 text-gray-900">
                {product.title || product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.brand || 'Unknown Brand'}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold text-gray-900">
                {(discountedPrice > 0 ? discountedPrice : price).toFixed(2)} Dh
              </span>
              {discountedPrice > 0 && price > discountedPrice && (
                <span className="text-xs text-gray-500 line-through">{price.toFixed(2)} Dh</span>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{product.size || 'N/A'}</span>
            <span className="mx-2">•</span>
            <span>{product.condition || 'N/A'}</span>
          </div>
        </div>
      </Link>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Registration Required
          </DialogTitle>
          <DialogDescription>
            Please log in or register to add items to your cart.
          </DialogDescription>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleGoToLogin}>
              Login
            </Button>
            <Button className="w-full sm:w-auto btn-morocco" onClick={handleGoToRegister}>
              Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;