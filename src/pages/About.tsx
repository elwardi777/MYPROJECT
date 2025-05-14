
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import { getTranslation } from '@/components/ui-custom/Navbar';

const About = () => {
  const [language, setLanguage] = useState<'en' >('en');
  
  // Listen for language changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en'].includes(savedLanguage)) {
      setLanguage(savedLanguage as 'en' );
    }
    
    const handleLanguageChange = (e: any) => {
      setLanguage(e.detail as 'en');
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
        <title>{t("aboutUs")} | VintedMaghreb</title>
        <meta name="description" content={t("Learn more about VintedMaghreb's mission and story")} />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("aboutUs")}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t("Our Story")}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("VintedMaghreb was founded in 2023 with a simple mission: to make second-hand fashion the first choice in the Maghreb region. What started as a small community of fashion enthusiasts has grown into a movement that's transforming how people think about clothing.")}
              </p>
              <p className="text-lg text-muted-foreground">
                {t("Today, millions of users across Morocco, Tunisia, and Algeria use our platform to buy, sell, and connect over unique fashion finds.")}
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden h-80 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
              <img 
                src="images/US.png" 
                alt={t("VintedMaghreb team")} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">{t("Our Mission")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">{t("Sustainability")}</h3>
                <p className="text-muted-foreground">
                  {t("By extending the lifecycle of clothing, we help reduce waste and the environmental impact of fashion.")}
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">{t("Community")}</h3>
                <p className="text-muted-foreground">
                  {t("We're building connections between people through their shared love of style and sustainable choices.")}
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">{t("Affordability")}</h3>
                <p className="text-muted-foreground">
                  {t("Great style shouldn't come with a high price tag. We make fashion accessible to everyone.")}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">{t("Our Values")}</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">✓</div>
                <div>
                  <h3 className="font-medium">{t("Trust & Transparency")}</h3>
                  <p className="text-muted-foreground">{t("We build trust through honest descriptions, fair pricing, and clear policies.")}</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mr-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">✓</div>
                <div>
                  <h3 className="font-medium">{t("Environmental Responsibility")}</h3>
                  <p className="text-muted-foreground">{t("Every item bought second-hand represents a step toward a more sustainable future.")}</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mr-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">✓</div>
                <div>
                  <h3 className="font-medium">{t("Inclusivity")}</h3>
                  <p className="text-muted-foreground">{t("We celebrate diversity in style, size, and culture, creating a welcoming space for all fashion lovers.")}</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">{t("Join Our Movement")}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t("Whether you're looking to refresh your wardrobe, declutter your closet, or simply browse, you're helping to create a more sustainable fashion ecosystem.")}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {t("Together, we're changing the way the Maghreb thinks about fashion—one garment at a time.")}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
