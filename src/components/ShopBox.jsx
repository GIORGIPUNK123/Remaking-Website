import { storeLangAndCurrency, changeLangAndCurrency } from '../store';
const MoneyDisplay = (props) => {
  console.log(props.LangAndCurrency[1]);
  if (props.LangAndCurrency[1] == 'gel') {
    return (
      <div className='shopbox-prices-normal'>
        <h2>{props.itemNewGelPrice}₾</h2>
        <h2>{props.itemGelPrice}₾</h2>
      </div>
    );
  } else {
    return (
      <div className='shopbox-prices-normal'>
        <h2>{props.itemNewPrice}$</h2>
        <h2>{props.itemPrice}$</h2>
      </div>
    );
  }
};
export const ShopBox = (props) => {
  const LangAndCurrency = storeLangAndCurrency.use();
  if (props.boxType == 'normal') {
    return (
      <>
        <div className='shopbox shopbox-normal'>
          <img
            className='shop-box-image'
            src={props.itemId}
            alt={props.itemName}
          />
          <span className='shop-box-name'>{props.itemName}</span>
          <MoneyDisplay
            itemPrice={props.itemPrice}
            itemNewPrice={props.itemNewPrice}
            itemGelPrice={props.itemGelPrice}
            itemNewGelPrice={props.itemNewGelPrice}
            LangAndCurrency={LangAndCurrency}
          />
        </div>
      </>
    );
  }
};
