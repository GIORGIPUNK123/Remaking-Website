import { entity } from 'simpler-state';
export const storeItems = entity([]);
export const storeLangAndCurrency = entity(['ge', 'gel']);

export const changeItems = (change) => {
  storeItems.set((value) => change);
};
export const changeLangAndCurrency = (change) => {
  storeLangAndCurrency.set((value) => change);
};
