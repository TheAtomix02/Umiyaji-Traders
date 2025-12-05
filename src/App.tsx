import React, { useState, useCallback } from 'react';
import { ViewState, CartItem, Product } from './types';
import { IntroReveal } from './components/IntroReveal';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Lookbook } from './pages/Lookbook';
import { Journal } from './pages/Journal';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { LiquidEther } from './components/LiquidEther'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
  const [view, setView] = useState<ViewState>('HOME');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleIntroComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => {
        setIntroFinished(true);
    }, 500); // Slight delay before unmounting to ensure smooth fade
  }, []);

  const addToCart = (product: Product, size: string) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
        const newItem: CartItem = { ...product, cartId: Math.random().toString(36).substr(2, 9), size };
        setCartItems([...cartItems, newItem]);
    } else {
        const newItem: CartItem = { ...product, cartId: Math.random().toString(36).substr(2, 9), size };
        setCartItems([...cartItems, newItem]);
    }
    setIsCartOpen(true);
    setSelectedProduct(null); 
  };

  const removeFromCart = (cartId: string) => {
      setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
      if (delta < 0) {
          removeFromCart(cartId);
      } else {
          const item = cartItems.find(i => i.cartId === cartId);
          if (item) {
              const newItem = { ...item, cartId: Math.random().toString(36).substr(2, 9) };
              setCartItems([...cartItems, newItem]);
          }
      }
  };

  const renderView = () => {
    switch (view) {
      case 'HOME': return <Home onNavigate={setView} onProductClick={setSelectedProduct} />;
      case 'SHOP': return <Shop onProductClick={setSelectedProduct} />;
      case 'LOOKBOOK': return <Lookbook />;
      case 'JOURNAL': return <Journal />;
      case 'ABOUT': return <About />;
      case 'CONTACT': return <Contact />;
      default: return <Home onNavigate={setView} onProductClick={setSelectedProduct} />;
    }
  };

  return (
    // REMOVED 'overflow-x-hidden' from this div to ensure position: sticky works correctly in children
    <div className="bg-brand-black min-h-screen text-brand-ivory selection:bg-brand-gold selection:text-brand-black relative cursor-none">
      
      {/* 4. Cinematic Intro Loader - Kept visible until introFinished - TOP Z-INDEX */}
      <AnimatePresence>
        {!introFinished && <IntroReveal onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* 0. Liquid Ether Background - The Only Background */}
      {!loading && (
        <div className="fixed inset-0 z-0 pointer-events-none">
           <LiquidEther 
              colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
           />
        </div>
      )}
      
      {/* 2. Custom Magnetic Cursor */}
      {!loading && <CustomCursor />}

      {/* 5. Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* 6. Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
      />

      {/* 7. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={setSelectedProduct}
      />

      {/* Main Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation 
            currentView={view} 
            onChangeView={(v) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView(v);
            }} 
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            cartCount={cartItems.length}
        />
        
        <main className="min-h-screen">
          <AnimatePresence mode='wait'>
            <motion.div
              key={view}
              className="w-full"
            >
              <PageTransition>
                 {renderView()}
              </PageTransition>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
}