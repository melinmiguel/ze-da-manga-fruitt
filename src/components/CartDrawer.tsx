import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RipenessLevel } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    removeFromCart,
    updateQuantity,
    updateRipeness,
    subtotal,
    shipping,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cep,
    shippingCity,
    calculateShipping
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [cepInput, setCepInput] = useState(cep);
  const [isCalculatingCep, setIsCalculatingCep] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculatingCep(true);
    await calculateShipping(cepInput);
    setIsCalculatingCep(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-amber-900/10 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-amber-50/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Seu Cesto de Mangas
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono tabular-nums">
                {items.reduce((sum, i) => sum + i.quantity, 0)} itens
              </span>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content / List of Items */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl">
                  🥭
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-800">
                  Seu cesto está vazio
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Aproveite a safra de mangas nobres colhidas hoje no Vale do São Francisco.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 bg-emerald-800 text-white text-xs font-semibold rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping progress bar */}
                <div className="p-3 bg-emerald-50/80 border border-emerald-200/60 rounded-xl text-xs">
                  {subtotal >= 120 ? (
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Parabéns! Você ganhou Frete Grátis nesta safra!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Falta pouco para Frete Grátis:</span>
                        <span className="font-bold text-emerald-800 font-mono tabular-nums">
                          R$ {(120 - subtotal).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / 120) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100 space-y-3">
                  {items.map((item) => {
                    const lineTotal = item.product.price * item.quantity;
                    return (
                      <div key={item.id} className="pt-3 flex gap-3.5 items-start">
                        {/* Thumb */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover bg-amber-50 shrink-0 border border-amber-900/10"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-slate-900 truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Remover item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[11px] text-slate-500">
                            {item.product.variety} · R$ {item.product.price.toFixed(2).replace('.', ',')} / {item.product.unit}
                          </p>

                          {/* Ripeness Picker */}
                          <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-slate-400">Ponto:</span>
                            <select
                              value={item.ripeness}
                              onChange={(e) => updateRipeness(item.id, e.target.value as RipenessLevel)}
                              className="text-[11px] py-0.5 px-1 bg-amber-50/70 border border-amber-200 rounded text-amber-950 font-medium cursor-pointer"
                            >
                              <option value="pronta">Pronta Hoje</option>
                              <option value="semana">Para a Semana</option>
                              <option value="madura_tardia">Mais Firme</option>
                            </select>
                          </div>

                          {/* Stepper and Price */}
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-bold font-mono tabular-nums text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                              R$ {lineTotal.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shipping Estimator */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Calcular Frete Climatizado:</span>
                  </div>
                  <form onSubmit={handleCepSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="00000-000"
                      value={cepInput}
                      onChange={(e) => setCepInput(e.target.value)}
                      maxLength={9}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                    <button
                      type="submit"
                      disabled={isCalculatingCep}
                      className="px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg hover:bg-slate-900 cursor-pointer"
                    >
                      Calcular
                    </button>
                  </form>
                  {shippingCity && (
                    <p className="text-[11px] text-emerald-800 mt-1.5 font-medium">
                      ✓ {shippingCity}
                    </p>
                  )}
                </div>

                {/* Coupon Input */}
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-950 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-amber-700" /> Cupom de Desconto:
                    </span>
                    <span className="text-[10px] text-amber-700 font-mono">Dica: ZEDAMANGA10</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-amber-100/80 px-2.5 py-1.5 rounded-lg text-xs">
                      <span className="font-mono font-bold text-amber-900">✓ {appliedCoupon}</span>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Insira seu cupom"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg uppercase font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Aplicar
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <p className={`text-[11px] mt-1.5 ${couponFeedback.success ? 'text-emerald-700 font-medium' : 'text-red-600'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer / Totals & Checkout Button */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums text-slate-800">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Frete Refrigerado:</span>
                  <span className="font-mono tabular-nums text-slate-800">
                    {shipping === 0 ? (
                      <strong className="text-emerald-700 font-bold">Grátis</strong>
                    ) : (
                      `R$ ${shipping.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Desconto Aplicado:</span>
                    <span className="font-mono tabular-nums">
                      - R$ {discount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
                  <span>Total:</span>
                  <span className="font-mono text-emerald-950 text-xl tabular-nums">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                onClick={openCheckout}
                className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Fechar Pedido e Ver Resumo</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
