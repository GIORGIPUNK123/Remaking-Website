import { ShopBoxTypes, CheckBoxTypes } from "../types";
export const filterBoxes = (
  itemsArr: ShopBoxTypes[],
  minValue: number,
  maxValue: number,
  currentValue: "usd" | "gel",
  inputText: string,
  checkBoxes: CheckBoxTypes[]
) => {
  const filteredItems = itemsArr.filter((item) => {
    const containsInputText = item.name.toLowerCase().includes(inputText);
    const priceField =
      currentValue === "usd" ? "startingPrice" : "startingGelPrice";
    return (
      (checkBoxes.length === 0 ||
        checkBoxes.some((checkBox) => checkBox[item.category])) &&
      containsInputText &&
      item[priceField] >= minValue &&
      item[priceField] <= maxValue
    );
  });
};
