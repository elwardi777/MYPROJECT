
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTranslation } from './Navbar';

const Footer = () => {
  const [language, setLanguage] = useState<'en'>('en');
  const location = useLocation();
  
  // Scroll to top when clicking a link
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
  
  // Categories for the footer links
  const categories = [
    {
      title: t('Our Story'),
      links: [
        { name: t('VintedMaghreb was founded in 2025 with a simple mission: to make second-hand fashion the first choice in the Maghreb region.') },
        { name: t(''), path: '/men' },
        { name: t(''), path: '/kids' }
      ]
    },
    {
      title: t('company'),
      links: [
        { name: t('aboutUs'), path: '/about' },
        { name: t('sustainability'), path: '/sustainability' }
      ]
    },
    {
      title: t('help'),
      links: [
        { name: t('helpCenter'), path: '/help-center' },
        { name: t('shipping'), path: '/shipping' },
        { name: t('FAQ'), path: '/faq' }
      ]
    }
  ];
  
  return (
    <footer className="bg-gray-50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
      
        {/* Help section */}
        <div className="relative mb-16 p-8 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 overflow-hidden">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold mb-2">{t('needHelp')}</h3>
            <p className="text-muted-foreground mb-4">{t('supportReady')}</p>
            <Link 
              to="/help-center"
              className="inline-block bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              onClick={handleLinkClick}
            >
              {t('contactSupport')}
            </Link>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
            </svg>
          </div>
        </div>
        
        {/* Navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {categories.map((category, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{category.title}</h4>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
  <h4 className="font-semibold mb-4">{t('connect')}</h4>
  <a
    href="mailto:abderahmanelwardi62@gmail.com"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    abderahmanelwardi62@gmail.com
  </a>
</div>

        </div>
        
        {/* Bottom section */}
        <div className="border-t pt-8 flex flex-col justify-center items-center">
  <p className="text-sm text-muted-foreground text-center font-semibold tracking-wide">
    © Created By <span className="text-primary">Abderrahmane</span> And <span className="text-primary">Zakaria</span>
  </p>
</div>

      </div>
    </footer>
  );
};

export default Footer;
