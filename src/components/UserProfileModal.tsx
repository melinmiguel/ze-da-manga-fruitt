import React, { useState } from 'react';
import { X, User, MapPin, Package, Award, LogOut, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OrderRecord } from '../types';

export const UserProfileModal: React.FC = () => {
  const { user, orders, isProfileOpen, closeProfile, logout } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  if (!isProfileOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-amber-900/10 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with profile badge */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-emerald-950 font-serif font-bold text-xl flex items-center justify-center shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                {user.name}
              </h3>
              <p className="text-xs text-amber-200">
                {user.email} · {user.phone}
              </p>
            </div>
          </div>

          <button
            onClick={closeProfile}
            className="p-1 rounded-lg hover:bg-emerald-700/60 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Status cards: Points & Club */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Saldo de Fidelidade:</span>
                <span className="text-xl font-bold text-amber-950 font-mono tabular-nums">
                  {user.mangaPoints} MangaPoints
                </span>
                <span className="text-[11px] text-amber-800 block mt-0.5">
                  Vale R$ {(user.mangaPoints * 0.1).toFixed(2).replace('.', ',')} em compras
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Plano Ativo no Clube:</span>
                <span className="text-base font-bold text-emerald-900">
                  {user.activeClubPlan || 'Nenhum plano ativo'}
                </span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">
                  {user.activeClubPlan ? 'Frete Grátis & 15% OFF ativo' : 'Assine para ganhar frete grátis'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Registered Address */}
          {user.address && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Endereço de Entrega Principal:</span>
              </div>
              <p className="text-xs text-slate-700">
                {user.address.logradouro}, {user.address.numero} {user.address.complemento && `(${user.address.complemento})`}
              </p>
              <p className="text-xs text-slate-500">
                {user.address.bairro} · {user.address.cidade} - {user.address.uf} · CEP {user.address.cep}
              </p>
            </div>
          )}

          {/* Orders History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-800" />
                <span>Histórico de Pedidos de Manga</span>
              </h4>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                {orders.length} pedidos realizados
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                Você ainda não realizou nenhum pedido.
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-amber-400 transition-colors shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-900">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {ord.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-950 text-sm block tabular-nums">
                          R$ {ord.total.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logout button */}
          <div className="pt-3 border-t border-slate-200 flex justify-end">
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
