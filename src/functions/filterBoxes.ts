import { GeneralItemType } from '../types';

export const filterBoxes = (
  generalItemsArr: GeneralItemType[],
  inputText: string,
  currentCurrency?: 'usd' | 'gel',
  minValue?: number,
  maxValue?: number,
  checkBoxesArr?: string[]
) => {
  return generalItemsArr.filter((item) => {
    const priceField =
      currentCurrency === 'usd' ? 'startingPrice' : 'startingGelPrice';
    const containsInputText = item.name
      .toLowerCase()
      .includes(inputText.toLowerCase());

    const categoryContainsCheckbox = checkBoxesArr
      ? checkBoxesArr.some((checkbox) => item.category.includes(checkbox))
      : true;

    if (minValue || (maxValue && checkBoxesArr?.length !== 0)) {
      return (
        categoryContainsCheckbox &&
        containsInputText &&
        item[priceField] > minValue! &&
        item[priceField] <= maxValue!
      );
    } else {
      return (
        containsInputText &&
        item[priceField] > minValue! &&
        item[priceField] <= maxValue!
      );
    }

    // return containsInputText && categoryContainsCheckbox;
  });
};
