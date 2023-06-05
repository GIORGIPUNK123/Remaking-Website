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

    const categoryContainsCheckbox = checkBoxesArr?.length
      ? checkBoxesArr.some((checkbox) => {
          console.log('CHECKBOX::: ', checkbox);
          console.log('item.category::: ', item.category);
          console.log('TRUE: ', item.category === checkbox);
          return item.category === checkbox;
        })
      : true;

    if (minValue !== undefined || maxValue !== undefined) {
      if (checkBoxesArr?.length) {
        return (
          categoryContainsCheckbox &&
          containsInputText &&
          item[priceField] > (minValue ?? Number.NEGATIVE_INFINITY) &&
          item[priceField] <= (maxValue ?? Number.POSITIVE_INFINITY)
        );
      }

      console.log('containsInputText: ', containsInputText);
      console.log(
        'item[priceField] > minValue: ',
        item[priceField] > minValue!
      );
      console.log(
        'item[priceField] <= maxValue: ',
        item[priceField] <= maxValue!
      );
      console.log(
        `if true it should render ${
          containsInputText && minValue
            ? item[priceField] > minValue
            : true && maxValue
            ? item[priceField] <= maxValue
            : true
        }`
      );
      return (
        containsInputText &&
        item[priceField] > (minValue ?? Number.NEGATIVE_INFINITY) &&
        item[priceField] <= (maxValue ?? Number.POSITIVE_INFINITY)
      );
    } else {
      return containsInputText;
    }
  });
};
