import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, X, ShoppingBag, UserCircle, LogOut, Globe } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const translations = {
  en: {
    women: 'Women',
    men: 'Men',
    kids: 'Kids',
    search: 'Search for items...',
    favorites: 'Favorites',
    cart: 'Cart',
    login: 'Login',
    register: 'Register',
    signOut: 'Sign out',
    sellNow: 'Sell Now',
    welcome: 'Welcome to VintedMaghreb',
    featuredProducts: 'Featured Products',
    viewAll: 'View All',
    shopNow: 'Shop Now',
    trending: 'Trending',
    newArrivals: 'New Arrivals',
    priceFilter: 'Filter by Price',
    sortBy: 'Sort by',
    category: 'Category',
    size: 'Size',
    condition: 'Condition',
    brand: 'Brand',
    color: 'Color',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    description: 'Description',
    details: 'Details',
    shipping: 'Shipping',
    returns: 'Returns',
    relatedProducts: 'Related Products',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    helpCenter: 'Help Center',
    myAccount: 'My Account',
    orders: 'Orders',
    settings: 'Settings',
    language: 'Language',
    
    // Home page specific content
    sustainableFashion: 'Sustainable Fashion',
    findYourPerfect: 'Find Your Perfect',
    styleMatch: 'Style Match',
    discoverUnique: 'Discover unique pre-loved fashion, sell your own clothes, and join a community that values sustainability.',
    startShopping: 'Start Shopping',
    sellItems: 'Sell Items',
    fashionModel: 'Fashion Model',
    featuredCollection: 'Featured Collection',
    summerEssentials: 'Summer Essentials',
    refreshingStyles: 'Refreshing styles for the warm season',
    discoverPopular: 'Discover our most popular items this season',
    all: 'All',
    satisfactory: 'Satisfactory',
    good: 'Good',
    veryGood: 'Very good',
    likeNew: 'Like new',
    needHelp: 'Need help?',
    supportReady: 'Our support team is always ready to assist you with any questions or issues.',
    contactSupport: 'Contact Support',
    shop: 'Shop',
    company: 'Company',
    sustainability: 'Sustainability',
    help: 'Help',
    connect: 'Connect',
    allRightsReserved: 'All rights reserved',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    cookieSettings: 'Cookie Settings',
    backToShopping: 'Back to Shopping',
    oneSize: 'One size',
    age: 'Age',
    'You have been successfully logged out': 'You have been successfully logged out'
  },
  fr: {
    // French translations (existing)
    // ...
    'You have been successfully logged out': 'Vous avez été déconnecté avec succès'
  },
  es: {
    // Spanish translations (existing)
    // ...
    'You have been successfully logged out': 'Has cerrado sesión correctamente'
  },
  ar: {
    // Arabic translations (existing)
    // ...
    'You have been successfully logged out': 'تم تسجيل خروجك بنجاح'
  }
};

export const getTranslation = (key: string, lang: 'en' | 'fr' | 'es' | 'ar'): string => {
  return (translations[lang] as any)[key] || key;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [logoLetterStates, setLogoLetterStates] = useState<boolean[]>([]);
  const [language, setLanguage] = useState<'en' | 'fr' | 'es' | 'ar'>('en'); 
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCartCount } = useCart();

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
      {/*

    const checkAuth = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        setIsAuthenticated(true);
        setCurrentUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };


    fetch('http://localhost:5000/current-user', {
  method: 'GET',
  credentials: 'include' // ضروري باش تبعث الكوكي
});



     */  }
     const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/current-user', {
          method: 'GET',

          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setCurrentUser(data.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };
    
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'es', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage as 'en' | 'fr' | 'es' | 'ar');
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      window.dispatchEvent(new CustomEvent('languageChange', { detail: savedLanguage }));
    }
    
    // Initial check
    checkAuth();
    
    // Add event listener for changes
    window.addEventListener('storage', checkAuth);
    
    // Set up logo animation
    setLogoLetterStates(Array("VintedMaghreb".length).fill(false));
    
    const interval = setInterval(() => {
      setLogoLetterStates(prev => {
        const newStates = [...prev];
        const randomIndex = Math.floor(Math.random() * newStates.length);
        newStates[randomIndex] = !newStates[randomIndex];
        return newStates;
      });
    }, 300);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeMenu();
    }
  };
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (res.ok) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        toast({
          title: "Signed out",
          description: "You have been successfully logged out",
        });
  
        // Redirect directly using window.location
        window.location.href = 'http://localhost:8080/';
      }
    } catch (err) {
      console.error("Logout error", err);
    }
  };
  
  const changeLanguage = (lang: 'en' | 'fr' | 'es' | 'ar') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
    
    toast({
      title: "Language changed",
      description: `The language has been changed to ${lang === 'en' ? 'English' : lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'Arabic'}`,
    });
    
    window.location.reload();
  };
  
  const t = translations[language];
  const cartCount = getCartCount();

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-md py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center" 
            onClick={closeMenu}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold overflow-hidden">
                {"VintedMaghreb".split('').map((letter, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-block transition-all duration-300",
                      logoHovered || logoLetterStates[index]
                        ? "text-primary transform translate-y-[-2px]"
                        : "text-secondary"
                    )}
                    style={{
                      transitionDelay: `${index * 30}ms`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </div>
          </Link>
          
          {/* Desktop Search */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex items-center relative max-w-md flex-1 mx-4"
          >
            <Input 
              type="search" 
              placeholder={t.search} 
              className="w-full pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </form>
          
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-full hover:bg-accent transition-all duration-300 flex items-center">
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es')}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Favorites button - always visible */}
            <Link to="/favorites" className="p-2 rounded-full hover:bg-accent transition-all duration-300 hover:scale-110">
              <Heart className="h-5 w-5" />
            </Link>
            
            {/* Cart button - only visible when authenticated */}
            {isAuthenticated && (
              <Link to="/cart" className="p-2 rounded-full hover:bg-accent transition-all duration-300 hover:scale-110 relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            
            {/* Authenticated user menu or login/register buttons */}
            {isAuthenticated ? (
              <>
                <div className="flex items-center">
                  <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-accent transition-colors">
                      <UserCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{currentUser?.username}</span>
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {/* User account links could go here */}
                    
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t.signOut}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Sell button - only for authenticated users */}
                <Link to="/sell ">
                  <Button className="btn-morocco hover:scale-105 transition-all duration-300">{t.sellNow}</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" className="hover:scale-105 transition-all duration-300">{t.login}</Button>
                </Link>
                <Link to="/auth/register">
                  <Button className="btn-morocco hover:scale-105 transition-all duration-300">{t.register}</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 transition-transform duration-300 pt-20 pb-6 px-4 overflow-auto",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Mobile search */}
        <form 
          onSubmit={handleSearch} 
          className="flex items-center relative mb-8"
        >
          <Input 
            type="search" 
            placeholder={t.search} 
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </form>
        
        {/* Mobile menu items */}
        <div className="space-y-4">
          {/* Language selector in mobile */}
          <div className="border-b pb-4">
            <div className="flex items-center space-x-2 py-2 mb-2">
              <Globe className="h-5 w-5" />
              <span>{t.language}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => changeLanguage('en')} 
                className={`py-2 px-3 rounded ${language === 'en' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                English
              </button>
              <button 
                onClick={() => changeLanguage('fr')} 
                className={`py-2 px-3 rounded ${language === 'fr' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                Français
              </button>
              <button 
                onClick={() => changeLanguage('es')} 
                className={`py-2 px-3 rounded ${language === 'es' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                Español
              </button>
              <button 
                onClick={() => changeLanguage('ar')} 
                className={`py-2 px-3 rounded ${language === 'ar' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                العربية
              </button>
            </div>
          </div>
          
          {/* Favorites link - always visible */}
          <Link 
            to="/favorites" 
            className="flex items-center space-x-2 py-2 hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            <Heart className="h-5 w-5" />
            <span>{t.favorites}</span>
          </Link>
          
          {/* Cart link - only when authenticated */}
          {isAuthenticated && (
            <Link 
              to="/cart" 
              className="flex items-center space-x-2 py-2 hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>{t.cart}</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          
          {/* Authenticated user options or login/register buttons */}
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2 py-2">
                <UserCircle className="h-5 w-5" />
                <span>{currentUser?.username}</span>
              </div>
              {/* Additional user account links can go here */}
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 py-2 hover:text-primary transition-colors pl-8"
                onClick={closeMenu}
              >
                <span>{t.myAccount}</span>
              </Link>
              <Link 
                to="/profile/orders" 
                className="flex items-center space-x-2 py-2 hover:text-primary transition-colors pl-8"
                onClick={closeMenu}
              >
                <span>{t.orders}</span>
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="flex items-center space-x-2 py-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{t.signOut}</span>
              </button>
              {/* Sell button for authenticated users */}
              <div className="pt-4">
                <Link to="/sell" onClick={closeMenu}>
                  <Button className="w-full btn-morocco">{t.sellNow}</Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/auth/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">{t.login}</Button>
                </Link>
                <Link to="/auth/register" onClick={closeMenu}>
                  <Button className="w-full btn-morocco">{t.register}</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;