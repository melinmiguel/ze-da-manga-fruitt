import React, { useState } from 'react';
import { Sparkles, Check, Gift, Truck, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { CLUB_PLANS } from '../data/mangas';
import { ClubPlan } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import clubBoxImg from '../assets/images/mango_club_box_1790202060237.jpg';

export const MangoClub: React.FC = () => {
  const { addToCart, openCart } = useCart();
  const { user, updateUser, openAuth } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>('clube-familia-tropical');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<string | null>(null);

  const handleSubscribe = (plan: ClubPlan) => {
    // Add custom club package to cart or activate on user
    if (!user) {
      openAuth('register');
      return;
    }

    updateUser({ activeClubPlan: plan.name });
    setSubscriptionSuccess(`Parabéns ${user.name.split(' ')[0]}! Você assinou o ${plan.name}. Sua primeira colheita será despachada nesta semana!`);
    
    // Also add to cart as special subscription item
    addToCart({
      id: plan.id,
      name: `Assinatura: ${plan.name}`,
      variety: 'Seleção Mista do Pomar',
      subtitle: `${plan.weightKilos} · ${plan.frequency}`,
      price: plan.priceMonth,
      unit: 'mensalidade',
      image: clubBoxImg,
      category: 'cestas',
      sweetnessBrix: 19,
      fiberLevel: 'Nenhuma',
      aroma: 'Buquê do Pomar Especial',
      origin: 'Fazenda Zé da Manga Exclusiva',
      weightApprox: plan.weightKilos,
      description: `Plano de assinatura oficial do Clube Zé da Manga Fruitt. Entrega quinzenal ou mensal programada.`,
      culinaryTips: ['Consumo regular', 'Frutas sempre no ponto ideal'],
      inStock: true
    }, 1, 'pronta');

    setTimeout(() => {
      openCart();
    }, 500);
  };

  return (
    <section id="clube" className="py-14 sm:py-20 bg-gradient-to-b from-amber-50/50 to-[#FAF7F2] border-y border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-900 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Clube de Assinatura Zé da Manga Fruitt</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Mangas colhidas no pé, direto na sua porta todos os meses.
          </h2>
          
          <p className="text-base text-slate-700 mt-3 leading-relaxed">
            Nunca mais compre manga verde ou sem sabor no mercado. Como membro do clube, você recebe remessas programadas das melhores mangadas da nossa safra, com garantia de doçura e benefícios exclusivos.
          </p>
        </div>

        {subscriptionSuccess && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-sm flex items-center gap-3 animate-in fade-in">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{subscriptionSuccess}</span>
          </div>
        )}

        {/* 3 Club Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CLUB_PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl bg-white p-7 transition-all flex flex-col justify-between ${
                  isFeatured
                    ? 'border-2 border-amber-500 shadow-xl lg:-translate-y-2 ring-4 ring-amber-500/10'
                    : 'border border-amber-900/10 shadow-xs hover:shadow-md'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-3.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>Mais Escolhido pelas Famílias</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-500">R$</span>
                      <span className="font-mono text-4xl font-bold text-slate-900 tabular-nums">
                        {plan.priceMonth.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ mês</span>
                    </div>

                    <div className="mt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{plan.weightKilos}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-600 font-normal">{plan.mangosCount}</span>
                    </div>
                  </div>

                  {/* Perks list */}
                  <ul className="mt-5 space-y-3 text-xs sm:text-sm text-slate-700">
                    {plan.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscribe Action Button */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      handleSubscribe(plan);
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                        : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                    }`}
                  >
                    <span>Assinar {plan.name}</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Sem fidelidade mínima · Cancele quando quiser
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Member Testimonials / Perks Grid */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-2xl border border-amber-900/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Entregas Climatizadas</h4>
              <p className="text-xs text-slate-600 mt-0.5">Frutas protegidas em temperatura controlada para não passar do ponto.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Brindes Sazonais</h4>
              <p className="text-xs text-slate-600 mt-0.5">Geleias artesanais, licores e mangas desidratadas sem açúcar adicionado.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Garantia Doce do Zé</h4>
              <p className="text-xs text-slate-600 mt-0.5">Qualquer fruta que não atender seu padrão de doçura é reposta imediatamente.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
