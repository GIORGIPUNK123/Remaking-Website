import { useSelector } from 'react-redux';
import { ItemType } from '../types';
import { changeAmountFromCart } from '../store/slices/cartSlice';

export const handleAddToCartClick = (currProduct: ItemType, amount: number) => {
  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );
  const isInCart = (productId: number) =>
    itemsObj.items.some((el) => el.id === productId);
  isInCart(currProduct.id) ? changeAmountFromCart(amount) : this;
};
