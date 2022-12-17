import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
export const itemsState = atom({
  key: "items", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const languageState = atom({
  key: "language", // unique ID (with respect to other atoms/selectors)
  default: "ge", // default value (aka initial value)
});
export const valueState = atom({
  key: "value", // unique ID (with respect to other atoms/selectors)
  default: "gel", // default value (aka initial value)
});
export const cartState = atom({
  key: "cart", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
