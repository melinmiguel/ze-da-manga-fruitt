import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-emerald-950 text-slate-300 pt-14 pb-24 md:pb-14 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-emerald-900/60 text-xs">
          
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥭</span>
              <span className="font-serif text-lg font-bold text-white">
                Zé da Manga <span className="text-amber-400 font-normal italic">Fruitt</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              O autêntico e-commerce e clube de assinatura de mangas nobres. Colheita diária no Vale do São Francisco para a sua mesa com doçura e frescor garantidos.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Navegação</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('inicio')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalogo')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Seleção de Variedades
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('clube')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Clube de Mangas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('fazenda')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Nossa Fazenda & Terroir
                </button>
              </li>
            </ul>
          </div>

          {/* Varieties */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Variedades da Safra</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Manga Palmer Real (Sem Fiapo)</li>
              <li>Manga Tommy Atkins Viva</li>
              <li>Manga Keitt Gigante Safra Ouro</li>
              <li>Manga Hadén Perfumada</li>
              <li>Manga Ubá Especial para Doces</li>
              <li>Cestos & Caixas de Degustação</li>
            </ul>
          </div>

          {/* Contact & Service */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Atendimento ao Cliente</h4>
            <div className="space-y-1.5 text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>WhatsApp: (87) 99124-5500</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>contato@zedamangafruitt.com.br</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Fazenda Zé da Manga - Rodovia da Fruta Km 24, Petrolina - PE</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Zé da Manga Fruitt. Todos os direitos reservados. CNPJ: 42.189.020/0001-94.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compra 100% Segura</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Garantia de Doçura ou Reenvio</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
