import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { MacType, GeneralMacTypes, CartItemTypes } from './types';
//TODO: REMOVE ATOMS
export const macsState = atom<MacType[]>({
  key: 'macs', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const generalMacsState = atom<GeneralMacTypes[]>({
  key: 'generalMacs', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const cartState = atom<CartItemTypes[]>({
  key: 'cart', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
