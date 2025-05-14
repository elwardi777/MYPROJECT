
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import { getTranslation } from '@/components/ui-custom/Navbar';

const Privacy = () => {
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
        <title>{t("Privacy Policy")} | VintedMaghreb</title>
        <meta name="description" content="VintedMaghreb privacy policy and data usage information" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("Privacy Policy")}</h1>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {t("Last updated: June 1, 2025")}
              </p>
              <p className="text-muted-foreground mb-8">
                {t("At VintedMaghreb, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.")}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">1. {t("Information We Collect")}</h2>
              <h3 className="font-medium mt-4 mb-2">{t("Personal Information")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("We may collect personal information that you voluntarily provide when registering for an account, creating a listing, making a purchase, or contacting our support team. This may include:")}
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>{t("Name")}</li>
                <li>{t("Email address")}</li>
                <li>{t("Phone number")}</li>
                <li>{t("Address")}</li>
                <li>{t("Payment information (processed securely through our payment processors)")}</li>
                <li>{t("Profile picture")}</li>
                <li>{t("Item listings and descriptions")}</li>
              </ul>
              
              <h3 className="font-medium mt-4 mb-2">{t("Automatically Collected Information")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("When you access our platform, we automatically collect certain information about your device and usage. This may include:")}
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>{t("Device type, operating system, and browser")}</li>
                <li>{t("IP address")}</li>
                <li>{t("Referring website")}</li>
                <li>{t("Pages viewed and time spent on pages")}</li>
                <li>{t("Search terms and filters used")}</li>
                <li>{t("Interaction with features and content")}</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">2. {t("How We Use Your Information")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("We use the information we collect for various purposes, including:")}
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>{t("Facilitating transactions between buyers and sellers")}</li>
                <li>{t("Creating and managing your account")}</li>
                <li>{t("Processing payments")}</li>
                <li>{t("Providing customer support")}</li>
                <li>{t("Improving our platform and services")}</li>
                <li>{t("Sending you updates, notifications, and marketing communications")}</li>
                <li>{t("Preventing fraud and ensuring security")}</li>
                <li>{t("Complying with legal obligations")}</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">3. {t("How We Share Your Information")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("We may share your information in the following circumstances:")}
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>{t("With other users as necessary to facilitate transactions (e.g., shipping address for sellers)")}</li>
                <li>{t("With service providers who perform services on our behalf")}</li>
                <li>{t("To comply with legal obligations")}</li>
                <li>{t("To protect our rights, privacy, safety, or property")}</li>
                <li>{t("In connection with a business transaction such as a merger or acquisition")}</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">4. {t("Cookies and Similar Technologies")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("We use cookies and similar technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings or through our Cookie Settings page.")}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">5. {t("Data Security")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, or alteration. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.")}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">6. {t("Your Rights and Choices")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("Depending on your location, you may have certain rights regarding your personal information, including:")}
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>{t("Accessing your personal information")}</li>
                <li>{t("Correcting inaccurate information")}</li>
                <li>{t("Deleting your information")}</li>
                <li>{t("Objecting to certain uses of your information")}</li>
                <li>{t("Withdrawing consent")}</li>
                <li>{t("Data portability")}</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                {t("To exercise these rights, please contact us at")} <a href="mailto:privacy@vintedmaghreb.com" className="text-primary">privacy@vintedmaghreb.com</a>
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">7. {t("Children's Privacy")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("Our platform is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.")}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">8. {t("Changes to This Privacy Policy")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.")}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">9. {t("Contact Us")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("If you have any questions about this Privacy Policy, please contact us at")} <a href="mailto:privacy@vintedmaghreb.com" className="text-primary">privacy@vintedmaghreb.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
