
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import { getTranslation } from '@/components/ui-custom/Navbar';
import { Switch } from "@/components/ui/switch";
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Cookies = () => {
  const [language, setLanguage] = useState<'en' | 'fr' | 'es' | 'ar'>('en');
  const [necessaryCookies, setNecessaryCookies] = useState(true);
  const [preferenceCookies, setPreferenceCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);
  
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
    
    // Load saved cookie preferences
    const cookiePreferences = localStorage.getItem('cookiePreferences');
    if (cookiePreferences) {
      const preferences = JSON.parse(cookiePreferences);
      setPreferenceCookies(preferences.preference);
      setAnalyticsCookies(preferences.analytics);
      setMarketingCookies(preferences.marketing);
    }
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const t = (key: string) => getTranslation(key, language);
  
  const saveCookiePreferences = () => {
    const preferences = {
      necessary: true, // Always true
      preference: preferenceCookies,
      analytics: analyticsCookies,
      marketing: marketingCookies
    };
    
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    toast({
      title: t("Preferences Saved"),
      description: t("Your cookie preferences have been updated."),
    });
  };
  
  return (
    <>
      <Helmet>
        <title>{t("Cookie Settings")} | VintedMaghreb</title>
        <meta name="description" content="Manage your cookie preferences on VintedMaghreb" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("Cookie Settings")}</h1>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <p className="text-muted-foreground mb-8">
                {t("We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.")}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{t("Necessary Cookies")}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t("These cookies are essential for the website to function properly")}</p>
                  </div>
                  <Switch checked={necessaryCookies} disabled={true} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("These cookies are required to enable core functionality of the website. Without these cookies, the website cannot function properly. These cookies do not store any personally identifiable information and cannot be disabled.")}
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{t("Preference Cookies")}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t("These cookies remember your preferences")}</p>
                  </div>
                  <Switch checked={preferenceCookies} onCheckedChange={setPreferenceCookies} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("These cookies allow us to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personal features. These cookies can also be used to remember changes you have made to text size, fonts, and other parts of web pages that you can customize.")}
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{t("Analytics Cookies")}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t("These cookies help us improve our website")}</p>
                  </div>
                  <Switch checked={analyticsCookies} onCheckedChange={setAnalyticsCookies} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("These cookies collect information about how you use our website, such as which pages you visit and if you experience any errors. The cookies don't collect information that identifies you directly and are used to help us improve how our website works, understand what interests our users, and measure the effectiveness of our content.")}
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{t("Marketing Cookies")}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t("These cookies track your online activity to help advertisers deliver more relevant advertising")}</p>
                  </div>
                  <Switch checked={marketingCookies} onCheckedChange={setMarketingCookies} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites. They do not directly store personal information, but are based on uniquely identifying your browser and internet device.")}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="outline" onClick={() => {
                setPreferenceCookies(false);
                setAnalyticsCookies(false);
                setMarketingCookies(false);
                setTimeout(saveCookiePreferences, 100);
              }}>
                {t("Reject All")}
              </Button>
              
              <Button variant="outline" onClick={() => {
                setPreferenceCookies(true);
                setAnalyticsCookies(true);
                setMarketingCookies(true);
                setTimeout(saveCookiePreferences, 100);
              }}>
                {t("Accept All")}
              </Button>
              
              <Button onClick={saveCookiePreferences}>
                {t("Save Preferences")}
              </Button>
            </div>
            
            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">{t("More Information About Cookies")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.")}
              </p>
              <p className="text-muted-foreground mb-4">
                {t("For more information about cookies, including how to see what cookies have been set on your device and how to manage and delete them, visit")} <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary">www.allaboutcookies.org</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cookies;
