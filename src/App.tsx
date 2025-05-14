
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./contexts/CartContext";
import { initAnimations } from "./utils/animations";
import { ScrollToTop } from "./utils/scrollToTop";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import WomenPage from "./pages/WomenPage";
import MenPage from "./pages/MenPage";
import KidsPage from "./pages/KidsPage";
import SellItemPage from "./pages/SellItemPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SearchResults from "./pages/SearchResults";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import AdminPage from "./pages/admin/AdminPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import About from "./pages/About";
import Sustainability from "./pages/Sustainability";
import HelpCenter from "./pages/HelpCenter";
import Shipping from "./pages/Shipping";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import { products } from "./lib/data";
import { AuthProvider } from '@/contexts/AuthContext';


// Add global type for mock product data
declare global {
  interface Window {
    mockProductData?: any[];
  }
}

const queryClient = new QueryClient();

const App = () => {
  // Initialize mockProductData with data from localStorage or default products
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        window.mockProductData = JSON.parse(storedProducts);
      } else {
        // Initialize localStorage with default products if empty
        localStorage.setItem('products', JSON.stringify(products));
        window.mockProductData = products;
      }
    } catch (error) {
      console.error("Error initializing products:", error);
      window.mockProductData = products;
    }
    
    // Initialize animations
    const cleanupAnimations = initAnimations();
    
    // Clean up animations on unmount
    return () => {
      cleanupAnimations();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/women" element={<WomenPage />} />
              <Route path="/men" element={<MenPage />} />
              <Route path="/kids" element={<KidsPage />} />
              <Route path="/sell" element={<SellItemPage />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminPage />} />
              
              {/* New routes for footer pages */}
              <Route path="/about" element={<About />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
