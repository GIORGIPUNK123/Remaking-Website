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
    console.log('TEST');
    const priceField =
      currentCurrency === 'usd' ? 'startingPrice' : 'startingGelPrice';
    const containsInputText = item.name
      .toLowerCase()
      .includes(inputText.toLowerCase());

    const categoryContainsCheckbox = checkBoxesArr
      ? checkBoxesArr.some((checkbox) => {
          console.log('CHECKBOX::: ', checkbox);
          return item.category === checkbox;
        })
      : true;

    if (minValue || maxValue) {
      return (
        categoryContainsCheckbox &&
        containsInputText &&
        item[priceField] > minValue! &&
        item[priceField] <= maxValue!
      );
    }
    // return containsInputText && categoryContainsCheckbox;
  });
};
