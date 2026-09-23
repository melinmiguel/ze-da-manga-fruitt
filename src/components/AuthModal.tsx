import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuth, authMode, openAuth, login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authMode === 'login') {
      if (!email || !password) {
        setError('Por favor preencha e-mail e senha.');
        return;
      }
      login(email, password);
    } else {
      if (!name || !email || !phone || !password) {
        setError('Por favor preencha todos os campos do cadastro.');
        return;
      }
      register(name, email, phone, password);
    }
  };

  const handleUseDemo = () => {
    login('anasilveira@exemplo.com.br', 'senha123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-amber-900/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥭</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-950">
                {authMode === 'login' ? 'Entrar no Zé da Manga' : 'Criar Conta no Pomar'}
              </h3>
              <p className="text-xs text-amber-950/80">
                {authMode === 'login' ? 'Acesse seus pedidos e clube de mangas' : 'Ganhe 50 MangaPoints de boas-vindas'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuth}
            className="p-1 rounded-lg hover:bg-amber-600 text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setError(null);
              openAuth('login');
            }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              authMode === 'login'
                ? 'text-emerald-900 border-b-2 border-emerald-800 bg-amber-50/30'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Já sou Cliente (Entrar)
          </button>
          <button
            type="button"
            onClick={() => {
              setError(null);
              openAuth('register');
            }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              authMode === 'register'
                ? 'text-emerald-900 border-b-2 border-emerald-800 bg-amber-50/30'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Criar Nova Conta
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Eduardo Silveira"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp / Celular
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {authMode === 'login' ? 'Entrar na Conta' : 'Concluir Cadastro'}
          </button>

          {/* Demo account quick login */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-xs text-amber-800 hover:text-amber-950 underline font-medium cursor-pointer"
            >
              Usar Conta Demonstração (Ana Silveira - Membro do Clube)
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
