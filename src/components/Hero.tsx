import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import heroImg from '../assets/images/hero_mango_orchard_1790202029223.jpg';

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreClub: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onExploreClub }) => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-amber-50/40 pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Story & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wide uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span>Colheita da Safra 2026 Aberta</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span className="text-amber-700">Vale do São Francisco</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.12] [text-wrap:balance]">
              O sabor autêntico da manga nobre, colhida no pé e entregue no ponto.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
              No <strong className="text-emerald-900 font-semibold">Zé da Manga Fruitt</strong>, selecionamos as variedades mais doces e aveludadas do Brasil. Sem fiapos, com aroma inebriante e brix calibrado para chegar fresquinha à sua mesa.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer text-sm sm:text-base"
              >
                <span>Escolher Minhas Mangas</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onExploreClub}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-500/40 font-semibold rounded-xl transition-all cursor-pointer text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Assinar Clube Zé da Manga</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-4 border-t border-amber-900/10 grid grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Zero Fiapos</span>
                  <span className="text-[11px] sm:text-xs text-slate-500">Variedades nobres</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Envio Fresco</span>
                  <span className="text-[11px] sm:text-xs text-slate-500">Colhida em até 24h</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Garantia Doce</span>
                  <span className="text-[11px] sm:text-xs text-slate-500">100% satisfação</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-amber-100">
              <img
                src={heroImg}
                alt="Colheita de mangas selecionadas no pomar Zé da Manga Fruitt"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating curated badge */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between text-xs text-amber-200 mb-1">
                  <span>Safra Especial do Vale</span>
                  <span className="font-mono tabular-nums">Brix 18° a 20°</span>
                </div>
                <p className="font-serif text-lg font-bold text-white leading-tight">
                  Palmer, Tommy, Keitt & Hadén selecionadas à mão
                </p>
              </div>
            </div>

            {/* Accent decorative stamp */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transform rotate-6 flex items-center gap-1">
              <span>🥭 100% Direto do Pomar</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
