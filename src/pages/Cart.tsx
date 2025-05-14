
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import Button from '@/components/ui-custom/Button';
import { ShoppingCart, X, ArrowRight, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const cardTypes = [
 
];

const PaymentDialog = ({ open, onOpenChange, total, onComplete }: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  total: number;
  onComplete: () => void;
}) => {
  const [paymentStep, setPaymentStep] = useState(1);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  });
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCardType, setSelectedCardType] = useState('visa');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentStep === 1) {
      setPaymentStep(2);
      return;
    }
    
    // Process payment
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onComplete();
      onOpenChange(false);
      
      toast({
        title: "Payment successful",
        description: "Your order has been placed successfully!",
      });
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your purchase of {total.toFixed(2)} Dh
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {paymentStep === 1 ? (
            <>
              <div className="space-y-2">
                <Label>Shipping Address</Label>
                <Input placeholder="Full Name" required />
                <Input placeholder="Address Line 1" required />
                <Input placeholder="Address Line 2" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="City" required />
                  <Input placeholder="Postal Code" required />
                </div>
                <Input placeholder="Country" required defaultValue="Morocco" />
              </div>
              
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 border p-2 rounded">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" /> Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-2 rounded">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    {cardTypes.map(card => (
                      <div 
                        key={card.id}
                        className={`border p-3 rounded-lg cursor-pointer transition-all ${
                          selectedCardType === card.id 
                            ? 'border-primary shadow-sm bg-primary/5' 
                            : 'hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedCardType(card.id)}
                      >
                        <div className="relative h-10 flex items-center justify-center">
                          <img 
                            src={card.image} 
                            alt={card.name} 
                            className="max-h-full max-w-full object-contain"
                          />
                          {selectedCardType === card.id && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="10" 
                                height="10" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="text-white"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-center mt-1">{card.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  value={cardDetails.name} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="number">Card Number</Label>
                <Input 
                  id="number" 
                  name="number" 
                  placeholder="4242 4242 4242 4242" 
                  value={cardDetails.number} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    name="expiry" 
                    placeholder="MM/YY" 
                    value={cardDetails.expiry} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input 
                    id="cvc" 
                    name="cvc" 
                    placeholder="123" 
                    value={cardDetails.cvc} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end pt-4">
            {paymentStep === 2 && (
              <Button type="button" variant="outline" className="mr-2" onClick={() => setPaymentStep(1)}>
                Back
              </Button>
            )}
            <Button 
              type="submit" 
              className="btn-morocco"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="mr-2">Processing...</span>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </>
              ) : paymentStep === 1 ? "Continue" : "Complete Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal, updateQuantity, getProductQuantity } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };
  
  const handleCompleteCheckout = () => {
    clearCart();
  };
  
  return (
    <>
      <Helmet>
        <title>Shopping Cart | VintedMaghreb</title>
        <meta name="description" content="View and manage your shopping cart" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link to="/">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-secondary/20 px-6 py-3 flex justify-between items-center">
                    <span className="font-medium">Item Details</span>
                    <button 
                      onClick={clearCart}
                      className="text-sm text-destructive flex items-center hover:underline"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item: any) => {
                      const quantity = getProductQuantity(item.id);
                      return (
                      <div key={item.id} className="p-4 flex items-center">
                        <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "https://images.unsplash.com/photo-1578932750356-9652b4a27976";
                            }}
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            <span>{item.brand}</span>
                            <span className="mx-2">•</span>
                            <span>{item.size}</span>
                            <span className="mx-2">•</span>
                            <span>{item.condition}</span>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="p-1 rounded-full border"
                              disabled={quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="p-1 rounded-full border"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">
                            {((item.discountedPrice > 0 ? item.discountedPrice : item.price) * quantity).toFixed(2)} Dh
                          </div>
                          {item.discountedPrice > 0 && (
                            <div className="text-sm text-muted-foreground line-through">
                              {(item.price * quantity).toFixed(2)} Dh
                            </div>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-5 w-5" />
                        </button>
                      </div>
                    )})}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-secondary/20 px-6 py-3">
                    <span className="font-medium">Order Summary</span>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                      <span>{getCartTotal().toFixed(2)} Dh</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    
                    <div className="pt-4 border-t flex justify-between items-center font-medium">
                      <span>Total</span>
                      <span className="text-xl">{getCartTotal().toFixed(2)} Dh</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 btn-morocco" 
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By proceeding, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <PaymentDialog 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen} 
        total={getCartTotal()}
        onComplete={handleCompleteCheckout}
      />
      
      <Footer />
    </>
  );
};

export default Cart;
