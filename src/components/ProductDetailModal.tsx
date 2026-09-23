import React, { useState } from 'react';
import { X, Check, ShoppingBag, Award, Flame, Sparkles, MapPin } from 'lucide-react';
import { MangoProduct, RipenessLevel } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: MangoProduct | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedRipeness, setSelectedRipeness] = useState<RipenessLevel>('pronta');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity, selectedRipeness);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image side */}
          <div className="relative bg-amber-50 h-64 md:h-full min-h-[260px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent md:hidden" />
            <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
              Variedade {product.variety}
            </div>
          </div>

          {/* Details side */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span>{product.origin}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-emerald-800">Safra Fresca</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-900 font-mono tabular-nums">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-slate-500">/ {product.unit}</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              {/* Sensory spec chart */}
              <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" /> Grau Brix (Doçura):
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{product.sweetnessBrix}° Brix (Muito Doce)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Presença de Fiapos:
                  </span>
                  <span className="font-bold text-emerald-800">{product.fiberLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-red-600" /> Nota de Aroma:
                  </span>
                  <span className="font-medium text-slate-800 truncate max-w-[170px]">{product.aroma}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Ripeness preference selection */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Ponto de Consumo Desejado:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedRipeness('pronta')}
                    className={`px-2 py-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedRipeness === 'pronta'
                        ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Pronta Hoje
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRipeness('semana')}
                    className={`px-2 py-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedRipeness === 'semana'
                        ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Para a Semana
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRipeness('madura_tardia')}
                    className={`px-2 py-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedRipeness === 'madura_tardia'
                        ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Mais Firme
                  </button>
                </div>
              </div>
            </div>

            {/* Quantity and CTA */}
            <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold font-mono tabular-nums text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Adicionar ao Cesto (R$ {(product.price * quantity).toFixed(2).replace('.', ',')})</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
