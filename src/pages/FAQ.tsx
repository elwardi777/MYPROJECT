
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

const FAQ = () => {
  const [language, setLanguage] = useState<'en' | 'fr' | 'es' | 'ar'>('en');
  
  // Listen for language changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'es', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage as 'en' | 'fr' | 'es' | 'ar');
    }
    
    const handleLanguageChange = (e: any) => {
      setLanguage(e.detail as 'en' | 'fr' | 'es' | 'ar');
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
        <title>FAQ | VintedMaghreb</title>
        <meta name="description" content="Frequently asked questions about VintedMaghreb" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">FAQ</h1>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="account">
                <AccordionTrigger className="text-lg font-medium">
                  {t("Account & Registration")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h3 className="font-medium">{t("How do I create an account?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Click on the 'Register' button in the top right corner and follow the instructions. You'll need to provide your email address, create a password, and choose a username.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("Is it free to create an account?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Yes, creating an account on VintedMaghreb is completely free.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("How do I reset my password?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Click on 'Login', then select 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("Can I change my username?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Yes, you can change your username in your account settings. However, you can only change it once every 30 days.")}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="buying">
                <AccordionTrigger className="text-lg font-medium">
                  {t("Buying")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h3 className="font-medium">{t("How do I search for items?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Use the search bar at the top of the page to search for specific items. You can also browse by category by clicking on 'Women', 'Men', or 'Kids' in the navigation menu.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("Can I make an offer on an item?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Yes, you can message the seller to negotiate the price. If you both agree, the seller can update the listing price or create a custom listing for you.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("What payment methods are accepted?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("We accept credit/debit cards, PayPal, and bank transfers. In some regions, we also support local payment methods.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("Is it safe to buy on VintedMaghreb?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Yes, we have measures in place to create a safe marketplace. We verify sellers, provide secure payment processing, and offer buyer protection for eligible purchases.")}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="selling">
                <AccordionTrigger className="text-lg font-medium">
                  {t("Selling")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h3 className="font-medium">{t("How do I list an item for sale?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Click on 'Sell Now' in the navigation bar. You'll need to upload photos, add a description, set a price, and provide shipping information for your item.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("What items can I sell on VintedMaghreb?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("You can sell clothing, accessories, and footwear for women, men, and kids. All items must be in wearable condition and comply with our terms of service.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("How much does it cost to sell?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Listing items is free. When you make a sale, we charge a small fee, which is a percentage of the sale price plus a fixed fee.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("When do I get paid for sold items?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Once the buyer receives and confirms the item, the payment will be released to your account. You can then withdraw it to your bank account or use it for purchases on VintedMaghreb.")}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-lg font-medium">
                  {t("Shipping & Delivery")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h3 className="font-medium">{t("Who is responsible for shipping?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Sellers are responsible for shipping items to buyers. When an item is sold, the seller receives the buyer's address and must arrange shipping.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("How long does shipping take?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Shipping times vary depending on the seller's location and the shipping method chosen. Standard shipping typically takes 3-7 business days within the same country.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("Can I track my order?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Yes, once the seller ships your order and provides a tracking number, you can track it through your account or via the shipping carrier's website.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("What if my package doesn't arrive?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("If your package hasn't arrived within the expected timeframe, first check the tracking information. If there's an issue, contact the seller. If you can't resolve it, open a dispute through our help center.")}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="returns">
                <AccordionTrigger className="text-lg font-medium">
                  {t("Returns & Refunds")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h3 className="font-medium">{t("What is your return policy?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Returns are handled on a case-by-case basis. If an item doesn't match the description or arrives damaged, you can open a dispute within 48 hours of receiving it.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("How do I return an item?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("If you need to return an item, first contact the seller to discuss the issue. If you can't reach a resolution, contact our support team who will guide you through the process.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("When will I receive my refund?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("Once the return is approved and the item is received back by the seller, refunds typically process within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method.")}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{t("Who pays for return shipping?")}</h3>
                      <p className="text-muted-foreground mt-1">
                        {t("If the return is due to the item not matching the description or arriving damaged, the seller typically covers return shipping. For other returns, the buyer may be responsible for return shipping costs.")}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
