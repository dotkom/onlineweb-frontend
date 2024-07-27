import { createEntityAdapter, createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';

import { IProductCategory } from '../models';

const productCategoriesAdapter = createEntityAdapter<IProductCategory>({
  sortComparer: (productCategoryA, productCategoryB) => {
    return productCategoryA.id - productCategoryB.id;
  },
});

export const productSizeSelectors = productCategoriesAdapter.getSelectors<State>(
  (state) => state.webshopProductCategories
);

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IProductCategory>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const productCategoriesSlice = createSlice({
  name: 'webshopProductCategories',
  initialState: productCategoriesAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    addProductCategory(state, action: PayloadAction<IProductCategory>) {
      productCategoriesAdapter.addOne(state, action.payload);
    },
    addProductCategories(state, action: PayloadAction<IProductCategory[]>) {
      productCategoriesAdapter.addMany(state, action.payload);
    },
  },
});

export const { addProductCategory, addProductCategories } = productCategoriesSlice.actions;

export const webshopProductCategoriesReducer = productCategoriesSlice.reducer;
