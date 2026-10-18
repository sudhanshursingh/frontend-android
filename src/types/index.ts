export type ScreenName =
  | 'explore'
  | 'product-detail'
  | 'quotes'
  | 'rfq-builder'
  | 'inbox'
  | 'checkout'
  | 'orders'
  | 'order-detail'
  | 'login'
  | 'buyer-profile';

export type MainTab = 'explore' | 'inbox' | 'quotes' | 'orders' | 'buyer-profile';

export interface Mill {
  id: string;
  name: string;
  location: string;
  cluster: string;
  rating: number;
  shipmentsCount: number;
  coreCapability: string;
  moq: string;
  verified: boolean;
  audited: boolean;
  image: string;
}

export interface ProductDetailData {
  specNumber: string;
  lotNumber: string;
  grade: string;
  title: string;
  tag: string;
  readyStock: string;
  images: {
    url: string;
    label: string;
    alt: string;
  }[];
  mill: {
    name: string;
    location: string;
    rating: number;
    shipments: number;
    audited: boolean;
    greigeReady: string;
    portDistance: string;
    features: string[];
  };
  priceTiers: {
    id: string;
    tier: string;
    name: string;
    range: string;
    minUnits: number;
    price: number;
    dispatchNote: string;
    badge?: string;
    marginLift?: string;
    featured?: boolean;
  }[];
  specifications: {
    title: string;
    value: string;
    sub: string;
    icon: string;
    iconColor: string;
  }[];
  weightSpectrum: {
    min: string;
    current: string;
    max: string;
    description: string;
  };
}

export interface QuoteBid {
  id: string;
  supplierName: string;
  location: string;
  rating: number;
  ordersCount: number;
  grade: string;
  unitPrice: number;
  totalValue: number;
  dispatchDays: number;
  dispatchLabel: string;
  sampling: string;
  isTopPick?: boolean;
  isLowestPrice?: boolean;
  leadTimeTag?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'supplier' | 'buyer';
  senderName: string;
  role: string;
  time: string;
  content: string;
  attachments?: {
    type: 'image';
    url: string;
    label: string;
    badge: string;
    location: string;
  }[];
}

export interface ActiveOffer {
  rfqNumber: string;
  unitRate: number;
  listRate: number;
  savings: number;
  volume: number;
  slaDays: number;
  destination: string;
  grossAmount: number;
  gstAmount: number;
  initialDeposit: number;
  validHours: number;
}
