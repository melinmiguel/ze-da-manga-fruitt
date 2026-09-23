export type RipenessLevel = 'pronta' | 'semana' | 'madura_tardia';

export interface MangoProduct {
  id: string;
  name: string;
  variety: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  category: 'in_natura' | 'sem_fiapo' | 'sucos_doces' | 'cestas';
  sweetnessBrix: number;
  fiberLevel: 'Nenhuma' | 'Baixíssima' | 'Moderada';
  aroma: string;
  origin: string;
  weightApprox: string;
  description: string;
  culinaryTips: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  product: MangoProduct;
  quantity: number;
  ripeness: RipenessLevel;
  selectedPackaging?: 'padrao' | 'presente';
}

export interface ClubPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonth: number;
  weightKilos: string;
  frequency: string;
  mangosCount: string;
  featured?: boolean;
  colorTheme: string;
  perks: string[];
}

export interface UserAddress {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  address?: UserAddress;
  mangaPoints: number;
  activeClubPlan?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  items: {
    productName: string;
    variety: string;
    quantity: number;
    unitPrice: number;
    ripeness: string;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Confirmado' | 'Colhendo no Pomar' | 'Em Trânsito' | 'Entregue';
  deliveryDateEstimated: string;
  shippingAddress: UserAddress;
  paymentMethod: 'pix' | 'credit_card' | 'delivery';
  pixCode?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
