import { configureStore } from '@reduxjs/toolkit';
import { generalItemsSlice } from './slices/generalItemsSlice';
import { itemsSlice } from './slices/itemsSlice';
import { currentUserSlice } from './slices/currentUserSlice';
import { languageSlice } from './slices/languageSlice';
import { currencySlice } from './slices/currencySlice';
import { cartSlice } from './slices/cartSlice';
// ...

export const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    generalItems: generalItemsSlice.reducer,
    currentUser: currentUserSlice.reducer,
    language: languageSlice.reducer,
    currency: currencySlice.reducer,
    cartItems: cartSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
