import React from 'react';
import { ShoppingBag, User, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const { itemCount, openCart } = useCart();
  const { user, openAuth, openProfile } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single brand wordmark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('inicio');
          }}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-sm group-hover:bg-amber-600 transition-colors">
            <span className="font-serif text-xl font-bold tracking-tighter text-emerald-950">🥭</span>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 block leading-tight">
              Zé da Manga <span className="text-amber-600 font-normal italic">Fruitt</span>
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <button
            onClick={() => onNavigateSection('catalogo')}
            className="hover:text-emerald-800 transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Seleção de Mangas
          </button>
          <button
            onClick={() => onNavigateSection('clube')}
            className="hover:text-emerald-800 transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center gap-1.5"
          >
            <span>Clube da Manga</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </button>
          <button
            onClick={() => onNavigateSection('fazenda')}
            className="hover:text-emerald-800 transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Nossa Fazenda
          </button>
          <button
            onClick={() => onNavigateSection('depoimentos')}
            className="hover:text-emerald-800 transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Avaliações
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <button
              onClick={openProfile}
              className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-emerald-900 hover:bg-amber-100/70 rounded-lg transition-colors cursor-pointer border border-emerald-900/10"
              title="Meu Perfil e Pedidos"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center text-xs font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => openAuth('login')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-emerald-900 hover:bg-amber-100/70 rounded-lg transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline">Entrar</span>
            </button>
          )}

          <button
            onClick={openCart}
            aria-label="Abrir carrinho de compras"
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Cesto</span>
            {itemCount > 0 && (
              <span className="bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full tabular-nums min-w-[18px] text-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
