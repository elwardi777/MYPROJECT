
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/ui-custom/Navbar';
import Footer from '@/components/ui-custom/Footer';
import { products } from '@/lib/data';

const KidsPage = () => {
  const kidsProducts = products.filter(product => product.category === 'kids');

  return (
    <>
      <Helmet>
        <title>Kids' Fashion | Vintique</title>
        <meta name="description" content="Discover kids' pre-loved fashion at Vintique" />
      </Helmet>
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Kids' Fashion</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Browse our curated collection of pre-loved kids' fashion. Find unique pieces that grow with your child while supporting sustainable fashion.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {kidsProducts.map(product => (
              <div key={product.id} className="transition-all duration-300 hover:-translate-y-1">
                <div className="product-card">
                  <img src={product.image} alt={product.name} className="w-full h-auto aspect-[3/4] object-cover rounded-lg" />
                  <div className="mt-3">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default KidsPage;
