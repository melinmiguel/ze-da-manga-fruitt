import React from 'react';
import { Home, Compass, Sparkles, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface MobileBottomNavProps {
  currentSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentSection,
  onNavigateSection
}) => {
  const { itemCount, openCart } = useCart();
  const { user, openAuth, openProfile } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-amber-900/10 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onNavigateSection('inicio')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-xs cursor-pointer ${
            currentSection === 'inicio' ? 'text-emerald-800 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Início</span>
        </button>

        <button
          onClick={() => onNavigateSection('catalogo')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-xs cursor-pointer ${
            currentSection === 'catalogo' ? 'text-emerald-800 font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Mangas</span>
        </button>

        <button
          onClick={() => onNavigateSection('clube')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-xs cursor-pointer relative ${
            currentSection === 'clube' ? 'text-amber-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-amber-500" />
          <span>Clube</span>
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <button
          onClick={user ? openProfile : () => openAuth('login')}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-xs text-slate-500 hover:text-emerald-800 cursor-pointer"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>{user ? 'Perfil' : 'Entrar'}</span>
        </button>

        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-xs text-emerald-900 font-semibold cursor-pointer relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-emerald-800" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cesto</span>
        </button>
      </div>
    </nav>
  );
};
