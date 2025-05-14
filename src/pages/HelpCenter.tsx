
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import { getTranslation } from '@/components/ui-custom/Navbar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpCenter = () => {
  const [language, setLanguage] = useState<'en'>('en');
  
  // Listen for language changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en'].includes(savedLanguage)) {
      setLanguage(savedLanguage as 'en');
    }
    
    const handleLanguageChange = (e: any) => {
      setLanguage(e.detail as 'en' );
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const t = (key: string) => getTranslation(key, language);
  
  return (
    <>
      <Helmet>
        <title>{t("helpCenter")} | VintedMaghreb</title>
        <meta name="description" content={t("Get help with your VintedMaghreb account and orders")} />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("helpCenter")}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">{t("Frequently Asked Questions")}</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("How do I create an account?")}</AccordionTrigger>
                  <AccordionContent>
                    {t("To create an account, click on the 'Register' button in the top right corner of the page. You'll need to provide your email, create a password, and choose a username.")}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t("How do I buy an item?")}</AccordionTrigger>
                  <AccordionContent>
                    {t("Browse items by category or search for something specific. When you find something you like, click on it to view details. If you want to purchase it, click 'Add to Cart' and proceed to checkout.")}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>{t("How do I sell an item?")}</AccordionTrigger>
                  <AccordionContent>
                    {t("Click on 'Sell Now' in the navigation bar. You'll need to upload photos, add a description, set a price, and provide shipping information for your item.")}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>{t("What payment methods are accepted?")}</AccordionTrigger>
                  <AccordionContent>
                    {t("We accept credit/debit cards, PayPal, and bank transfers. In some regions, we also support local payment methods.")}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>{t("How does shipping work?")}</AccordionTrigger>
                  <AccordionContent>
                    {t("Sellers are responsible for shipping items to buyers. When you purchase an item, the seller will be notified and will arrange shipping. You can track your order in your account dashboard.")}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>{t("What if I'm not satisfied with my purchase?")}</AccordionTrigger>
                  <AccordionContent>
                    {t("If there's an issue with your purchase, you can open a dispute within 48 hours of receiving the item. Our support team will help resolve the issue.")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-4">{t("Still need help?")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("Our support team is available to assist you with any questions or issues you may have.")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{t("Email us")}</p>
                    <a href="mailto:support@vintedmaghreb.com" className="text-primary text-sm">support@vintedmaghreb.com</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{t("Response time")}</p>
                    <p className="text-sm text-muted-foreground">{t("Usually within 24 hours")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{t("Popular Topics")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a href="#" className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">{t("Account Settings")}</h3>
                <p className="text-sm text-muted-foreground">{t("Update your profile, password, and notifications")}</p>
              </a>
              
              <a href="#" className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">{t("Buying Guide")}</h3>
                <p className="text-sm text-muted-foreground">{t("Tips for a smooth buying experience")}</p>
              </a>
              
              <a href="#" className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">{t("Selling Guide")}</h3>
                <p className="text-sm text-muted-foreground">{t("How to list items and make successful sales")}</p>
              </a>
              
              <a href="#" className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">{t("Shipping Information")}</h3>
                <p className="text-sm text-muted-foreground">{t("Shipping options, costs, and tracking")}</p>
              </a>
              
              <a href="#" className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">{t("Returns & Refunds")}</h3>
                <p className="text-sm text-muted-foreground">{t("What to do if there's an issue with your order")}</p>
              </a>
              
              <a href="#" className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">{t("Payment Methods")}</h3>
                <p className="text-sm text-muted-foreground">{t("Available payment options and security information")}</p>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HelpCenter;
