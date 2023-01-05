export interface ItemTypes {
  id: number;
  price: number;
  salePrice: number;
  gelPrice: number;
  saleGelPrice: number;
  images: string[];
  inStock: number;
  name: string;
  type: string;
}
export interface CartItemTypes {
  itemId: number;
  amount: number;
}
export interface ShopBoxTypes {
  itemImages: string[];
  itemId: number;
  itemPrice: number;
  itemSalePrice: number;
  itemGelPrice: number;
  itemSaleGelPrice: number;
  shop?: boolean;
  itemName: string;
}
export interface MoneyDisplayTypes {
  itemPrice: number;
  itemSalePrice: number;
  itemGelPrice: number;
  itemSaleGelPrice: number;
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
  filterTypes: string[];
  setFilterTypes: (value: string[]) => void;
}
