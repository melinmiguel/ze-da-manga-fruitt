import { MangoProduct, ClubPlan } from '../types';

import palmerImg from '../assets/images/mango_palmer_variety_1790202039075.jpg';
import tommyImg from '../assets/images/mango_tommy_variety_1790202049225.jpg';
import clubBoxImg from '../assets/images/mango_club_box_1790202060237.jpg';

export const MANGO_PRODUCTS: MangoProduct[] = [
  {
    id: 'manga-palmer-premium',
    name: 'Manga Palmer Real',
    variety: 'Palmer',
    subtitle: '100% livre de fibras, polpa aveludada e doce',
    price: 18.90,
    originalPrice: 22.50,
    unit: 'kg (aprox. 2 a 3 un)',
    image: palmerImg,
    category: 'sem_fiapo',
    sweetnessBrix: 18,
    fiberLevel: 'Nenhuma',
    aroma: 'Floral com notas de mel silvestre',
    origin: 'Fazenda Rio Bravo, Vale do São Francisco - PE',
    weightApprox: '450g a 550g cada fruto',
    description: 'A favorita dos chefs e apreciadores de manga pura. A Palmer possui casca roxa-avermelhada que se tinge de amarelo quando madura. Sua polpa é extraordinariamente macia, sem fiapos, com doçura concentrada e caroço fino.',
    culinaryTips: [
      'Degustação in natura geladinha com raspas de limão siciliano',
      'Carpaccio de manga com pimenta rosa e azeite extravirgem',
      'Saladas tropicais com rúcula e queijo de cabra'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'manga-tommy-atkins',
    name: 'Manga Tommy Atkins Viva',
    variety: 'Tommy Atkins',
    subtitle: 'Vibrante, suculenta e com equilíbrio cítrico perfeito',
    price: 13.50,
    originalPrice: 16.00,
    unit: 'kg (aprox. 2 un)',
    image: tommyImg,
    category: 'in_natura',
    sweetnessBrix: 15,
    fiberLevel: 'Baixíssima',
    aroma: 'Frutado intenso e tropical cítrico',
    origin: 'Pomar Sol Dourado, Petrolina - PE',
    weightApprox: '480g cada fruto',
    description: 'A clássica rainha dos pomares brasileiros. Casca espessa com tom rubi e amarelo vivo. Polpa firme, suculenta e muito refrescante, excelente tanto para comer em pedaços firmes quanto para drinks tropicais.',
    culinaryTips: [
      'Chutney de manga picante para acompanhar queijos e carnes',
      'Caipirinha de manga com manjericão fresco',
      'Cubos congelados para smoothies matinais cremosos'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'manga-keitt-gourmet',
    name: 'Manga Keitt Safra Ouro',
    variety: 'Keitt',
    subtitle: 'Tardia, fruto gigante e caroço ultrafino',
    price: 21.90,
    unit: 'kg (1 fruto grande)',
    image: palmerImg,
    category: 'sem_fiapo',
    sweetnessBrix: 19,
    fiberLevel: 'Nenhuma',
    aroma: 'Doce delicado com toque amanteigado',
    origin: 'Vale do Submédio São Francisco - BA/PE',
    weightApprox: '650g a 800g cada fruto',
    description: 'Frutos colossais com casca que permanece verde-oliva e ganha tons alaranjados. Possui a menor proporção de caroço do mercado, permitindo fatias inteiras macias e suculentas sem nenhuma fibra incômoda.',
    culinaryTips: [
      'Fatias puras para sobremesas elegantes',
      'Mousse aerado de manga sem adição de açúcar',
      'Picolés artesanais de polpa pura'
    ],
    inStock: true,
  },
  {
    id: 'manga-haden-aromatica',
    name: 'Manga Hadén Imperial',
    variety: 'Hadén',
    subtitle: 'A mais perfumada do Brasil, cor dourada intensa',
    price: 16.80,
    unit: 'kg (aprox. 3 un)',
    image: tommyImg,
    category: 'in_natura',
    sweetnessBrix: 17,
    fiberLevel: 'Baixíssima',
    aroma: 'Floral denso inconfundível, perfuma o ambiente',
    origin: 'Fazenda Zé da Manga, Juazeiro - BA',
    weightApprox: '380g a 450g cada',
    description: 'Reconhecida pelo perfume que toma conta da fruteira assim que atinge a maturação ideal. Polpa amarela brilhante e sabor tradicional com notas frutadas complexas.',
    culinaryTips: [
      'Geleias artesanais aromáticas com fava de baunilha',
      'Ceviche tropical com peixe branco e coentro',
      'Consumo com sorvete de tapioca'
    ],
    inStock: true,
  },
  {
    id: 'manga-espada-raiz',
    name: 'Manga Espada Selecionada',
    variety: 'Espada',
    subtitle: 'A queridinha dos quintais brasileiros, sabor nostálgico',
    price: 11.90,
    unit: 'kg (aprox. 3 a 4 un)',
    image: palmerImg,
    category: 'sucos_doces',
    sweetnessBrix: 16,
    fiberLevel: 'Moderada',
    aroma: 'Marcante e doce profundo',
    origin: 'Agricultura Familiar Parceira, Sertão da Bahia',
    weightApprox: '300g a 380g cada',
    description: 'Sabor de infância colhida no pé! A Manga Espada do Zé é colhida no ponto onde sua polpa atinge a maior concentração de néctar e suculência.',
    culinaryTips: [
      'O melhor suco de manga batido bem gelado',
      'Doce de manga em calda de tachinho de cobre',
      'Picolé refrescante de fruta pura'
    ],
    inStock: true,
  },
  {
    id: 'manga-uba-ouro',
    name: 'Manga Ubá Especial Doces',
    variety: 'Ubá',
    subtitle: 'Riqueza de sabor concentrado para caldas e sucos',
    price: 12.90,
    unit: 'kg (aprox. 5 un pequenas)',
    image: tommyImg,
    category: 'sucos_doces',
    sweetnessBrix: 20,
    fiberLevel: 'Moderada',
    aroma: 'Notas intensas de caramelo e fruta madura',
    origin: 'Polo Frutícola de Minas & Bahia',
    weightApprox: '200g cada fruto',
    description: 'Fruto compacto, mas com a mais alta densidade de açúcares naturais. É a variedade número um para quem ama fazer compotas, néctares concentrados e licores artesanais.',
    culinaryTips: [
      'Compota de manga com cravo e canela',
      'Calda espessa para regar cheesecakes e pudins',
      'Néctar integral puro matinal'
    ],
    inStock: true,
  },
  {
    id: 'cesto-degustacao-safra',
    name: 'Cesto Degustação Safra Zé da Manga',
    variety: 'Mix Especial',
    subtitle: '6 mangas premium variadas + Geleia Artesanal 240g',
    price: 68.00,
    originalPrice: 79.00,
    unit: 'Cesto presenteável (aprox. 3,5kg)',
    image: clubBoxImg,
    category: 'cestas',
    sweetnessBrix: 18,
    fiberLevel: 'Nenhuma',
    aroma: 'Buquê tropical completo',
    origin: 'Colheita Selecionada das Melhores Árvores',
    weightApprox: '3,5kg total',
    description: 'Um presente memorável ou uma experiência única para a família. Contém 2 mangas Palmer selecionadas no ponto, 2 Tommy Atkins rubras, 2 Keitt imperiais e um pote da nossa exclusiva Geleia de Manga com Cardamomo artesanal.',
    culinaryTips: [
      'Perfeito para presentear quem valoriza comida de verdade',
      'Tábua de degustação comparativa de variedades',
      'Geleia inclusa vai perfeitamente com torradas e queijo brie'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'caixa-familia-pomar',
    name: 'Caixa Pomar Sem Fiapo (6kg)',
    variety: 'Palmer & Keitt',
    subtitle: 'Caixa reforçada com mangas colhidas no dia do envio',
    price: 89.90,
    originalPrice: 105.00,
    unit: 'Caixa de madeira (6kg)',
    image: clubBoxImg,
    category: 'cestas',
    sweetnessBrix: 19,
    fiberLevel: 'Nenhuma',
    aroma: 'Fragrância de pomar fresco',
    origin: 'Fazenda Zé da Manga Direta',
    weightApprox: '6kg calibrados',
    description: 'A melhor escolha para famílias que amam manga no café da manhã e lanches. Mangas de calibre nobre, embaladas individualmente em proteção ecológica para chegar intactas na sua mesa.',
    culinaryTips: [
      'Alimentação saudável para a semana inteira',
      'Sobremesas leves para toda a família',
      'Congelamento em cubos para smoothies naturais'
    ],
    inStock: true,
  }
];

export const CLUB_PLANS: ClubPlan[] = [
  {
    id: 'clube-avulso-casal',
    name: 'Cesto Casal Frescor',
    tagline: 'Ideal para 1 a 2 pessoas apaixonadas por fruta fresca',
    priceMonth: 79.90,
    weightKilos: '4 kg / entrega',
    frequency: 'Quinzenal (2 entregas no mês)',
    mangosCount: 'Aprox. 8 a 10 mangas nobres',
    colorTheme: 'green',
    perks: [
      'Mangas colhidas 24h antes do envio',
      'Variedades Palmer e Keitt selecionadas sem fiapo',
      'Acompanha guia de maturação do Zé',
      '10% OFF em qualquer produto avulso da loja',
      'Pausa ou cancelamento a qualquer momento'
    ]
  },
  {
    id: 'clube-familia-tropical',
    name: 'Cesto Família Tropical',
    tagline: 'O plano mais querido: frutas fartas para todos os dias',
    priceMonth: 139.90,
    weightKilos: '8 kg / entrega',
    frequency: 'Quinzenal ou Semanal programado',
    mangosCount: 'Aprox. 16 a 18 mangas nobres',
    featured: true,
    colorTheme: 'amber',
    perks: [
      'Frete Grátis garantido em todas as entregas',
      'Seleção Mista Especial (Palmer + Tommy + Keitt + Hadén)',
      '1 brinde artesanal todo mês (geleia, manga desidratada ou licor)',
      '15% OFF ilimitado em pedidos adicionais',
      'Prioridade nas safras raras de verão'
    ]
  },
  {
    id: 'clube-gourmet-empresa',
    name: 'Cesto Empório & Escritório',
    tagline: 'Abastecimento corporativo ou apreciadores exigentes',
    priceMonth: 249.90,
    weightKilos: '15 kg / entrega',
    frequency: 'Semanal ou Quinzenal',
    mangosCount: 'Aprox. 32 mangas selecionadas calibradas',
    colorTheme: 'red',
    perks: [
      'Frete Expresso Grátis com agendamento prioritário',
      'Frutas no ponto exato de consumo para a semana',
      'Embalagem térmica protetora especial sustentável',
      '20% OFF em caixas comemorativas de fim de ano',
      'Atendimento direto via WhatsApp com o Zé da Manga'
    ]
  }
];
