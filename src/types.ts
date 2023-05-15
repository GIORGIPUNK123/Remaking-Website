export interface MacType {
  id: number;
  price: number;
  salePrice?: number;
  gelPrice: number;
  saleGelPrice?: number;
  images: string[];
  inStock: number;
  name: string;
  ram: number;
  storage: number;
  size: number;
  color: string;
}
export interface GeneralMacTypes {
  id: number;
  name: string;
  startingPrice: number;
  startingGelPrice: number;
  type: string;
  images: string[];
  category: string;
}
export interface ItemType {
  id: number;
  price: number;
  salePrice?: number;
  gelPrice: number;
  saleGelPrice?: number;
  images: string[];
  inStock: number;
  name: string;
  ram?: number;
  storage?: number;
  size?: number;
  color: string;
  type: string;
  category: string;
}
export interface CartItemTypes {
  itemId: number;
  amount: number;
}
export interface ShopBoxTypes {
  images: string[];
  id: number;
  startingPrice: number;
  salePrice?: number;
  startingGelPrice: number;
  saleGelPrice?: number;
  shop?: boolean;
  general?: boolean;
  name: string;
  type?: string;
  category: string;
}
export interface MoneyDisplayTypes {
  price: number;
  salePrice?: number;
  gelPrice: number;
  saleGelPrice?: number;
}
export interface PriceRangeSliderTypes {
  maxPrice: number;
  minSliderValue: number;
  setMinSliderValue: (value: number) => void;
  maxSliderValue: number;
  setMaxSliderValue: (value: number) => void;
}
export interface CheckBoxTypes {
  isMac: boolean;
  setIsMac: (value: boolean) => void;
  isIphone: boolean;
  setIsIphone: (value: boolean) => void;
  isAirpods: boolean;
  setIsAirpods: (value: boolean) => void;
}
export interface UserType {
  id?: number;
  email?: string;
  locked?: boolean;
  name?: string;
  surname?: string;
  password?: string;
  rank?: string;
  verified?: boolean;
}
export interface GeneralItemType {
  id: number;
  name: string;
  startingPrice: number;
  startingGelPrice: number;
  type: string;
  images: string[];
  category: string;
}
