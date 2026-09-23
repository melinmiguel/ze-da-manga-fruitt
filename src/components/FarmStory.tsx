import React from 'react';
import { Sun, Droplets, Heart, Award } from 'lucide-react';
import palmerImg from '../assets/images/mango_palmer_variety_1790202039075.jpg';

export const FarmStory: React.FC = () => {
  return (
    <section id="fazenda" className="py-16 sm:py-20 bg-white border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-900/10">
              <img
                src={palmerImg}
                alt="Polpa dourada da Manga Palmer cortada do Zé da Manga"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-emerald-800 text-white p-4 rounded-xl shadow-md hidden sm:block max-w-xs">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase mb-0.5">
                <Award className="w-4 h-4" />
                <span>Terroir do Vale</span>
              </div>
              <p className="text-xs text-emerald-100">
                Mais de 300 dias de sol por ano geram frutos com o mais alto teor de doçura natural (Brix 18° a 20°).
              </p>
            </div>
          </div>

          {/* Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Nossa Origem</span>
              <span aria-hidden="true">·</span>
              <span>Vale do São Francisco</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight [text-wrap:balance]">
              Três gerações dedicadas a colher a manga mais doce do Brasil.
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              O projeto <strong className="text-slate-900 font-semibold">Zé da Manga Fruitt</strong> nasceu com uma obsessão simples: devolver aos brasileiros o prazer de comer manga de verdade. Aquela fruta carnuda, perfumada, sem nenhum fiapo preso no dente, que escorre doçura na primeira mordida.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Nossos pomares margeiam as águas cristalinas do Rio São Francisco. Não usamos aceleração química de maturação: colhemos apenas os frutos que atingiram o índice de maturação natural no pé. Cada lote é embalado em berços individuais anti-impacto e enviado em transporte climatizado.
            </p>

            {/* Farm Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="space-y-1">
                <Sun className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-slate-900">Sol & Brix Intenso</h4>
                <p className="text-slate-500">Fotossíntese abundante que concentra os néctares da fruta naturalmente.</p>
              </div>

              <div className="space-y-1">
                <Droplets className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-slate-900">Irrigação Precisa</h4>
                <p className="text-slate-500">Gotejamento sustentável preservando a umidade ideal da raiz.</p>
              </div>

              <div className="space-y-1">
                <Heart className="w-5 h-5 text-red-600" />
                <h4 className="font-bold text-slate-900">Colheita Manual</h4>
                <p className="text-slate-500">Corte com tesoura e luva para proteger a casca e o pedúnculo.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
