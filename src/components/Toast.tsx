import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-emerald-950 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-emerald-700/50 max-w-sm">
        <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-100">
          {toastMessage}
        </p>
      </div>
    </div>
  );
};
