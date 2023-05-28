import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { generalItemsReducer } from './slices/generalItemsSlice';
import { itemsReducer } from './slices/itemsSlice';
import { currentUserReducer } from './slices/currentUserSlice';
import { languageReducer } from './slices/languageSlice';
import { currencyReducer } from './slices/currencySlice';
import { cartItemsReducer } from './slices/cartSlice';
import { currentTokenSlice } from './slices/currentTokenSlice';
import storage from 'redux-persist/es/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  items: itemsReducer,
  generalItems: generalItemsReducer,
  language: languageReducer,
  currency: currencyReducer,
  cartItems: cartItemsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUser', 'cartItems'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
