import { configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from 'articles/slices/articles';
import { paymentsReducer } from 'payments/reducers';
import { shopReducer } from 'shop/reducers';

export const initStore = (initialState: {} = {}) => {
  return configureStore({
    preloadedState: initialState,
    reducer: {
      articles: articlesReducer,
      payments: paymentsReducer,
      shop: shopReducer,
    },
  });
};

export const store = initStore();

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Store = typeof store;
