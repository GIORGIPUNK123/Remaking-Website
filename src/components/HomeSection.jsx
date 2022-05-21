import { useEffect, useState } from 'react';
import { Header } from './Header';
import { storeItems, changeItems } from '../store';
import { ShopBox } from './ShopBox';

export const HomeSection = () => {
  const items = storeItems.use();
  useEffect(() => {
    fetch('https://geolab-project.herokuapp.com/items')
      .then((response) => response.json())
      .then((data) => changeItems(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(items);
  return (
    <>
      <Header />
      <section>
        <div className='best-seller'>
          {items.map((item) => (
            <ShopBox
              boxType={'normal'}
              key={item.id}
              itemId={item.id}
              itemName={item.name}
              itemPrice={item.price}
              itemNewPrice={item.newPrice}
              itemGelPrice={item.gelPrice}
              itemNewGelPrice={item.newGelPrice}
            />
          ))}
        </div>
      </section>
    </>
  );
};
