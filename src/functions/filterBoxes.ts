import { GeneralItemType } from '../types';
export const filterBoxes = (
  generalItemsArr: GeneralItemType[],
  inputText: string,
  currentCurrency?: 'usd' | 'gel',
  minValue?: number,
  maxValue?: number,
  checkBoxes?: any[]
  // filterTypes
) => {
  return generalItemsArr.filter((item) => {
    const priceField =
      currentCurrency === 'usd' ? 'startingPrice' : 'startingGelPrice';
    const containsInputText = item.name
      .toLowerCase()
      .includes(inputText.toLowerCase());

    // (filterTypes.length === 0 || filterTypes.includes(item.type)) &&
    if (minValue || maxValue) {
      return (
        containsInputText &&
        item[priceField] > minValue! &&
        item[priceField] <= maxValue!
      );
    }
    return containsInputText;
  });
};
