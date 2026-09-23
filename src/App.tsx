/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { MangoClub } from './components/MangoClub';
import { FarmStory } from './components/FarmStory';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Toast } from './components/Toast';
import { MobileBottomNav } from './components/MobileBottomNav';

function MainLayout() {
  const [currentSection, setCurrentSection] = useState('inicio');

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'catalogo', 'clube', 'fazenda', 'depoimentos'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setCurrentSection(s);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col text-slate-900 selection:bg-amber-200 selection:text-amber-900">
      {/* Top Bar adhering to 3-zone contract */}
      <Navbar onNavigateSection={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreCatalog={() => scrollToSection('catalogo')}
          onExploreClub={() => scrollToSection('clube')}
        />
        <ProductCatalog />
        <MangoClub />
        <FarmStory />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Mobile Ergonomic Bottom Bar (sub 15% mobile viewport height) */}
      <MobileBottomNav
        currentSection={currentSection}
        onNavigateSection={scrollToSection}
      />

      {/* Slide-out & Overlay Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <UserProfileModal />

      {/* Real-time Toast Feedback */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </AuthProvider>
  );
}
