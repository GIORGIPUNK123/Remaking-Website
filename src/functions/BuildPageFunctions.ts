export const handleAddToCartClick = () => {
  const isInCart = (
    productId: number,
    arr: { itemId: number; amount: number }[]
  ) => arr.some((el) => el.itemId === productId);
  // setCartItems([...cartItems, { itemId: currentId, amount: itemAmount }]);
  console.log("i should push");

  //   setButtonIsDisabled(true);
  //   const timer = setTimeout(() => {
  //     setButtonIsDisabled(false);
  //   }, 1500);
  //   return () => clearTimeout(timer);
};
