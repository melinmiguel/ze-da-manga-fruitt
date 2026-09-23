import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, OrderRecord } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  orders: OrderRecord[];
  isAuthOpen: boolean;
  isProfileOpen: boolean;
  authMode: 'login' | 'register';
  openAuth: (mode?: 'login' | 'register') => void;
  closeAuth: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, phone: string, pass: string) => boolean;
  logout: () => void;
  addOrder: (order: OrderRecord) => void;
  updateUser: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'user_ze_101',
  name: 'Ana Carolina Silveira',
  email: 'anasilveira@exemplo.com.br',
  phone: '(11) 98765-4321',
  cpf: '123.456.789-00',
  address: {
    cep: '01310-100',
    logradouro: 'Avenida Paulista',
    numero: '1578',
    complemento: 'Apto 124B',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    uf: 'SP'
  },
  mangaPoints: 240,
  activeClubPlan: 'Cesto Família Tropical'
};

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-9921',
    orderNumber: 'ZDF-8842',
    date: '18/09/2026',
    items: [
      {
        productName: 'Manga Palmer Real',
        variety: 'Palmer',
        quantity: 2,
        unitPrice: 18.90,
        ripeness: 'Pronta para consumo'
      },
      {
        productName: 'Cesto Degustação Safra Zé da Manga',
        variety: 'Mix Especial',
        quantity: 1,
        unitPrice: 68.00,
        ripeness: 'Mista'
      }
    ],
    subtotal: 105.80,
    shipping: 0.00,
    discount: 10.58,
    total: 95.22,
    status: 'Entregue',
    deliveryDateEstimated: '20/09/2026',
    shippingAddress: {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Apto 124B',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    paymentMethod: 'pix',
    customerName: 'Ana Carolina Silveira',
    customerEmail: 'anasilveira@exemplo.com.br',
    customerPhone: '(11) 98765-4321'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('zedamanga_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('zedamanga_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('zedamanga_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('zedamanga_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('zedamanga_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const login = (email: string) => {
    const newUser: UserProfile = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      phone: '(11) 99887-6655',
      mangaPoints: 100,
      address: {
        cep: '04538-133',
        logradouro: 'Av. Brigadeiro Faria Lima',
        numero: '3477',
        bairro: 'Itaim Bibi',
        cidade: 'São Paulo',
        uf: 'SP'
      }
    };
    setUser(newUser);
    closeAuth();
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: 'user_' + Date.now(),
      name,
      email,
      phone,
      mangaPoints: 50,
      address: {
        cep: '22041-001',
        logradouro: 'Avenida Atlântica',
        numero: '1702',
        bairro: 'Copacabana',
        cidade: 'Rio de Janeiro',
        uf: 'RJ'
      }
    };
    setUser(newUser);
    closeAuth();
    return true;
  };

  const logout = () => {
    setUser(null);
    closeProfile();
  };

  const addOrder = (order: OrderRecord) => {
    setOrders(prev => [order, ...prev]);
    if (user) {
      setUser(prev => prev ? {
        ...prev,
        mangaPoints: prev.mangaPoints + Math.floor(order.total)
      } : null);
    }
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isAuthOpen,
        isProfileOpen,
        authMode,
        openAuth,
        closeAuth,
        openProfile,
        closeProfile,
        login,
        register,
        logout,
        addOrder,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
