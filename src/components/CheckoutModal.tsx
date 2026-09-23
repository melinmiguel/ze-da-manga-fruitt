import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  QrCode,
  CreditCard,
  Truck,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Sparkles,
  Printer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { OrderRecord, UserAddress } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    subtotal,
    shipping,
    discount,
    total,
    clearCart
  } = useCart();

  const { user, addOrder, openProfile } = useAuth();

  const [step, setStep] = useState<'delivery' | 'payment' | 'summary'>('delivery');
  
  // Delivery Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [cep, setCep] = useState(user?.address?.cep || '01310-100');
  const [logradouro, setLogradouro] = useState(user?.address?.logradouro || 'Avenida Paulista');
  const [numero, setNumero] = useState(user?.address?.numero || '1578');
  const [complemento, setComplemento] = useState(user?.address?.complemento || 'Apto 124B');
  const [bairro, setBairro] = useState(user?.address?.bairro || 'Bela Vista');
  const [cidade, setCidade] = useState(user?.address?.cidade || 'São Paulo');
  const [uf, setUf] = useState(user?.address?.uf || 'SP');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'delivery'>('pix');
  const [installments, setInstallments] = useState('1');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);

  // Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (user) {
      if (!name) setName(user.name);
      if (!email) setEmail(user.email);
      if (!phone) setPhone(user.phone);
      if (user.address) {
        setCep(user.address.cep);
        setLogradouro(user.address.logradouro);
        setNumero(user.address.numero);
        setComplemento(user.address.complemento || '');
        setBairro(user.address.bairro);
        setCidade(user.address.cidade);
        setUf(user.address.uf);
      }
    }
  }, [user]);

  if (!isCheckoutOpen) return null;

  const pixString = `00020126580014br.gov.bcb.pix0136zedamanga-chave-aleatoria-safra-2026520400005303986540${total.toFixed(2)}5802BR5920ZE DA MANGA FRUITT6009PETROLINA62070503***6304E8A2`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixString);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !cep || !logradouro || !numero) {
      alert('Por favor, preencha todos os campos obrigatórios de endereço e contato.');
      return;
    }
    setStep('payment');
  };

  const handleFinishOrder = () => {
    const orderNum = `ZDF-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    
    // Delivery estimated 2 business days later
    const estDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR');

    const addressObj: UserAddress = {
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf
    };

    const newOrder: OrderRecord = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      date: dateStr,
      items: items.map(i => ({
        productName: i.product.name,
        variety: i.product.variety,
        quantity: i.quantity,
        unitPrice: i.product.price,
        ripeness: i.ripeness === 'pronta' ? 'Pronta Hoje' : i.ripeness === 'semana' ? 'Para a Semana' : 'Mais Firme'
      })),
      subtotal,
      shipping,
      discount,
      total,
      status: 'Confirmado',
      deliveryDateEstimated: estDate,
      shippingAddress: addressObj,
      paymentMethod,
      pixCode: pixString,
      customerName: name,
      customerEmail: email,
      customerPhone: phone
    };

    setConfirmedOrder(newOrder);
    addOrder(newOrder);
    clearCart();
    setStep('summary');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-amber-900/10 overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-amber-50/70 border-b border-amber-900/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🥭</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {step === 'summary' ? 'Resumo do Pedido & Confirmação' : 'Finalizar Pedido de Mangas'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 'delivery' && 'Passo 1 de 2: Endereço de Entrega & Contato'}
                {step === 'payment' && 'Passo 2 de 2: Forma de Pagamento'}
                {step === 'summary' && 'Pedido Gerado com Sucesso!'}
              </p>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Progress (only in delivery & payment) */}
        {step !== 'summary' && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-center gap-6 text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step === 'delivery' ? 'text-emerald-800' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'delivery' ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
                1
              </span>
              <span>Entrega & Contato</span>
            </div>
            <span className="text-slate-300">———</span>
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-emerald-800' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'payment' ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
                2
              </span>
              <span>Pagamento</span>
            </div>
          </div>
        )}

        {/* Step 1: Delivery & Contact */}
        {step === 'delivery' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  E-mail para Recibo e Rastreio *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp / Celular para Notificação da Colheita *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CEP de Entrega *
                </label>
                <input
                  type="text"
                  required
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Logradouro (Rua / Avenida) *
                </label>
                <input
                  type="text"
                  required
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  placeholder="Ex: Av. Paulista"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número *
                </label>
                <input
                  type="text"
                  required
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="123"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Apto, Bloco"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bairro *
                </label>
                <input
                  type="text"
                  required
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bela Vista"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cidade / UF *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="São Paulo"
                    className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={uf}
                    onChange={(e) => setUf(e.target.value.toUpperCase())}
                    placeholder="SP"
                    className="w-14 px-2 py-2 text-sm text-center uppercase bg-white border border-slate-300 rounded-lg font-mono focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <span className="text-xs text-slate-500">
                Total do Pedido: <strong className="text-emerald-950 font-mono font-bold text-sm">R$ {total.toFixed(2).replace('.', ',')}</strong>
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Avançar para Pagamento</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-800" />
                <span className="text-xs">PIX (5% OFF Instantâneo)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-600" />
                <span className="text-xs">Cartão de Crédito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('delivery')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMethod === 'delivery'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Truck className="w-5 h-5 text-red-600" />
                <span className="text-xs">Pagar na Entrega</span>
              </button>
            </div>

            {/* PIX Panel */}
            {paymentMethod === 'pix' && (
              <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Visual QR Code Generator */}
                  <div className="w-36 h-36 bg-white p-2.5 rounded-xl shadow-sm border border-emerald-300 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-900">
                      <rect width="100" height="100" fill="white" />
                      {/* Stylized QR Matrix */}
                      <path fill="currentColor" d="M10 10h28v28H10zm6 6h16v16H16zM62 10h28v28H62zm6 6h16v16H68zM10 62h28v28H10zm6 6h16v16H16zM22 22h4v4h-4zm52 0h4v4h-4zm-52 52h4v4h-4zm24-64h8v8h-8zm16 0h8v8h-8zm0 16h8v8h-8zm-8 8h8v8h-8zm-16 8h8v8h-8zm24 8h8v8h-8zm8 8h8v8h-8zm-40 0h8v8h-8zm16 8h8v8h-8zm8 8h8v8h-8zm-24 8h8v8h-8zm32 0h8v8h-8zm-16 8h8v8h-8z" />
                    </svg>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Aprovação Imediata com Despacho Prioritário</span>
                    </div>
                    <p>
                      Abra o aplicativo do seu banco, escolha a opção <strong>PIX Copia e Cola</strong> ou aponte a câmera para o QR Code ao lado.
                    </p>
                    <p className="font-semibold text-slate-900">
                      Valor total: <span className="text-emerald-900 font-mono text-base font-bold">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </p>
                  </div>
                </div>

                {/* Copy Code */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixString}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-emerald-300 rounded-lg font-mono text-slate-600 truncate select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Código</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Credit Card Panel */}
            {paymentMethod === 'credit_card' && (
              <div className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="NOME COMO NO CARTAO"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 text-sm uppercase bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Validade (MM/AA)
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono text-center focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Código de Segurança (CVV)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono text-center focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parcelamento
                    </label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none cursor-pointer"
                    >
                      <option value="1">1x de R$ {total.toFixed(2).replace('.', ',')} (sem juros)</option>
                      <option value="2">2x de R$ {(total / 2).toFixed(2).replace('.', ',')} (sem juros)</option>
                      <option value="3">3x de R$ {(total / 3).toFixed(2).replace('.', ',')} (sem juros)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Pay on Delivery Panel */}
            {paymentMethod === 'delivery' && (
              <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl text-xs text-slate-700 space-y-2">
                <div className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Pagamento no Momento da Entrega</span>
                </div>
                <p>
                  O entregador levará a maquininha para pagamento em cartão de crédito/débito ou você poderá pagar em dinheiro no ato da conferência das mangas.
                </p>
                <p className="text-slate-500">
                  Você pode abrir a caixa na presença do motorista para conferir a integridade das frutas antes de efetuar o pagamento.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep('delivery')}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Endereço</span>
              </button>

              <button
                type="button"
                onClick={handleFinishOrder}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Confirmar e Concluir Pedido</span>
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Order Summary & Confirmation */}
        {step === 'summary' && confirmedOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Success Banner */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Pedido Recebido no Pomar!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Obrigado, <strong className="text-slate-900">{confirmedOrder.customerName}</strong>! A equipe do Zé da Manga já foi avisada para colher suas mangas na árvore.
              </p>
            </div>

            {/* Order Code & Status card */}
            <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Número do Pedido:</span>
                <span className="font-mono font-bold text-amber-950 text-sm">{confirmedOrder.orderNumber}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Data do Pedido:</span>
                <span className="font-semibold text-slate-900">{confirmedOrder.date}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Status Atual:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  {confirmedOrder.status}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">Previsão de Entrega:</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {confirmedOrder.deliveryDateEstimated}
                </span>
              </div>
            </div>

            {/* Items Summary Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-semibold text-slate-700">
                Itens da Safra Solicitados
              </div>
              <div className="divide-y divide-slate-100 p-4 space-y-3">
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{it.productName}</span>
                      <span className="text-slate-500 ml-2">({it.ripeness})</span>
                      <div className="text-[11px] text-slate-500">
                        {it.quantity}x a R$ {it.unitPrice.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-800 tabular-nums">
                      R$ {(it.quantity * it.unitPrice).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals table footer */}
              <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-200 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums">R$ {confirmedOrder.subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete Climatizado:</span>
                  <span className="font-mono tabular-nums">
                    {confirmedOrder.shipping === 0 ? 'Grátis' : `R$ ${confirmedOrder.shipping.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Desconto:</span>
                    <span className="font-mono tabular-nums">- R$ {confirmedOrder.discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total Pago:</span>
                  <span className="font-mono text-emerald-950 text-base tabular-nums">
                    R$ {confirmedOrder.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-semibold text-slate-900 block">Endereço de Envio Registrado:</span>
              <p className="text-slate-600">
                {confirmedOrder.shippingAddress.logradouro}, {confirmedOrder.shippingAddress.numero}
                {confirmedOrder.shippingAddress.complemento && ` - ${confirmedOrder.shippingAddress.complemento}`}
              </p>
              <p className="text-slate-600">
                {confirmedOrder.shippingAddress.bairro} · {confirmedOrder.shippingAddress.cidade} - {confirmedOrder.shippingAddress.uf} · CEP {confirmedOrder.shippingAddress.cep}
              </p>
            </div>

            {/* Actions button group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Recibo</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    closeCheckout();
                    openProfile();
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Ver no Meu Perfil
                </button>

                <button
                  type="button"
                  onClick={closeCheckout}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
