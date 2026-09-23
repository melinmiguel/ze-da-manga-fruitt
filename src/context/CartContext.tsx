import React, { createContext, useContext, useState, useEffect } from 'react';
import { MangoProduct, CartItem, RipenessLevel } from '../types';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  appliedCoupon: string | null;
  cep: string;
  shippingCity: string;
  toastMessage: string | null;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addToCart: (product: MangoProduct, quantity?: number, ripeness?: RipenessLevel) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateRipeness: (itemId: string, ripeness: RipenessLevel) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  calculateShipping: (cepInput: string) => Promise<boolean>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zedamanga_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [cep, setCep] = useState('01310-100');
  const [shippingCity, setShippingCity] = useState('São Paulo - SP (Entrega Expressa)');
  const [shipping, setShipping] = useState(12.90);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('zedamanga_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product: MangoProduct, quantity = 1, ripeness: RipenessLevel = 'pronta') => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.ripeness === ripeness);
      if (existing) {
        return prev.map(item =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${ripeness}-${Date.now()}`,
          product,
          quantity,
          ripeness
        };
        return [...prev, newItem];
      }
    });
    showToast(`+${quantity} ${product.name} adicionado ao cesto!`);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const updateRipeness = (itemId: string, ripeness: RipenessLevel) => {
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, ripeness } : item));
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ZEDAMANGA10' || clean === 'MANGA10') {
      setAppliedCoupon(clean);
      setDiscountPercent(0.10);
      return { success: true, message: 'Cupom de 10% OFF aplicado!' };
    }
    if (clean === 'FRETEGRATIS' || clean === 'ZEDOFRETE') {
      setAppliedCoupon(clean);
      setShipping(0);
      return { success: true, message: 'Frete Grátis ativado com sucesso!' };
    }
    if (clean === 'CLUBE20') {
      setAppliedCoupon(clean);
      setDiscountPercent(0.20);
      return { success: true, message: 'Desconto de 20% do Clube Zé da Manga aplicado!' };
    }
    return { success: false, message: 'Cupom inválido ou expirado. Teste ZEDAMANGA10 ou FRETEGRATIS' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setShipping(12.90);
  };

  const calculateShipping = async (cepInput: string) => {
    const sanitized = cepInput.replace(/\D/g, '');
    setCep(cepInput);

    if (sanitized.length >= 8) {
      // Free shipping for orders above 120
      if (subtotal >= 120) {
        setShipping(0);
        setShippingCity('São Paulo e Região (Frete Grátis Safra)');
      } else {
        // Standard quick logic
        if (sanitized.startsWith('0')) {
          setShipping(9.90);
          setShippingCity('Capital / Grande SP (1 a 2 dias úteis)');
        } else if (sanitized.startsWith('1') || sanitized.startsWith('2')) {
          setShipping(14.90);
          setShippingCity('Sudeste Expresso Climatizado (2 dias úteis)');
        } else if (sanitized.startsWith('4') || sanitized.startsWith('5')) {
          setShipping(7.90);
          setShippingCity('Nordeste / Polo Petrolina (1 dia útil)');
        } else {
          setShipping(19.90);
          setShippingCity('Brasil Expresso Refrigerado (2 a 3 dias)');
        }
      }
      return true;
    }
    return false;
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Free shipping threshold
  const currentShipping = subtotal >= 120 || appliedCoupon === 'FRETEGRATIS' ? 0 : shipping;
  const discount = subtotal * discountPercent;
  const total = Math.max(0, subtotal - discount + currentShipping);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping: currentShipping,
        discount,
        total,
        isCartOpen,
        isCheckoutOpen,
        appliedCoupon,
        cep,
        shippingCity,
        toastMessage,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        updateRipeness,
        applyCoupon,
        removeCoupon,
        calculateShipping,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
