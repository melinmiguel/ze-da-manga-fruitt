import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Eye, Plus, ShoppingBag } from 'lucide-react';
import { MANGO_PRODUCTS } from '../data/mangas';
import { MangoProduct } from '../types';
import { useCart } from '../context/CartContext';
import { ProductDetailModal } from './ProductDetailModal';

export const ProductCatalog: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<MangoProduct | null>(null);

  const categories = [
    { id: 'todas', label: 'Todas as Mangas' },
    { id: 'sem_fiapo', label: '100% Sem Fiapo' },
    { id: 'in_natura', label: 'Clássicas & Suculentas' },
    { id: 'sucos_doces', label: 'Sucos & Doces' },
    { id: 'cestas', label: 'Cestas & Presentes' },
  ];

  const filteredProducts = useMemo(() => {
    return MANGO_PRODUCTS.filter(product => {
      const matchesCategory =
        selectedCategory === 'todas' || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and editorial kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <span>Pomar Direto</span>
              <span aria-hidden="true">·</span>
              <span>Variedades Selecionadas</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Seleção Nobre de Mangas Zé da Manga
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Cada fruto é colhido no ponto de maturação ideal para garantir máxima doçura natural e textura aveludada.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar Palmer, Tommy, Cestas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-amber-900/15 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-white text-slate-700 border-amber-900/10 hover:bg-amber-50 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-amber-900/20 p-8">
            <p className="font-serif text-lg text-slate-700">Nenhuma manga encontrada para "{searchQuery}"</p>
            <p className="text-sm text-slate-500 mt-1">Tente buscar por "Palmer", "Tommy" ou redefina o filtro.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todas');
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-semibold text-xs rounded-lg cursor-pointer hover:bg-amber-600"
            >
              Ver Todas as Variedades
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-amber-900/10 hover:border-amber-400/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Image */}
                  <div className="relative bg-amber-50/40 aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Ribbon or tag */}
                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        Destaque do Zé
                      </div>
                    )}

                    {/* Quick view button overlay */}
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-lg shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-medium cursor-pointer"
                      title="Ver ficha sensorial"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Ver Ficha</span>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet metadata line */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-amber-700">{product.variety}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.sweetnessBrix}° Brix</span>
                        <span aria-hidden="true">·</span>
                        <span className={product.fiberLevel === 'Nenhuma' ? 'text-emerald-700 font-medium' : ''}>
                          {product.fiberLevel === 'Nenhuma' ? 'Sem Fiapo' : product.fiberLevel + ' Fibra'}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-900 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Price & Add to Cart button */}
                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-mono text-lg font-bold text-emerald-900 tabular-nums">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block truncate max-w-[100px]">
                          {product.unit}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product, 1, 'pronta')}
                        className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                        title="Adicionar ao Cesto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
};
