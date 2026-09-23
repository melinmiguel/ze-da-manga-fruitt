import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Chef Marcelo Guimarães',
      role: 'Restaurante Cais Tropical, São Paulo - SP',
      text: 'Trabalho com confeitaria há 15 anos e nunca encontrei uma Manga Palmer tão equilibrada. Sem nenhuma fibra, rendimento de 92% por fruto e um Brix estável. Mudou o nosso carpaccio de frutas.',
      variety: 'Membro do Clube Gourmet'
    },
    {
      name: 'Juliana Barros & Família',
      role: 'Assinante do Clube há 8 meses, Belo Horizonte - MG',
      text: 'Minhas filhas rejeitavam mangas de supermercado por causa dos fiapos. Com as mangas do Zé, o cesto de 8kg acaba em menos de uma semana! Chegam no ponto exato, parece que colhemos no quintal.',
      variety: 'Cesto Família Tropical'
    },
    {
      name: 'Dr. Ricardo Vasconcellos',
      role: 'Médico Nutrólogo, Rio de Janeiro - RJ',
      text: 'A entrega com embalagem protegida me surpreendeu: nenhuma fruta amassada. O aroma quando se abre a caixa da Manga Hadén toma conta da cozinha inteira. Uma experiência gastronômica impecável.',
      variety: 'Comprador de Safra Nobre'
    }
  ];

  return (
    <section id="depoimentos" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Mais de 4.800 caixas de mangas nobres entregues
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            99.4% de satisfação com doçura e textura avaliada por clientes em todo o Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-amber-900/10 shadow-xs flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "{rev.text}"
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {rev.role}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {rev.variety}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
