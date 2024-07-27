import { createEntityAdapter, createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';

import { ISize } from '../models';

const productSizesAdapter = createEntityAdapter<ISize>({
  sortComparer: (productSizeA, productSizeB) => {
    return productSizeA.id - productSizeB.id;
  },
});

export const productSizeSelectors = productSizesAdapter.getSelectors<State>((state) => state.webshopProductSizes);

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, ISize>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const productSizesSlice = createSlice({
  name: 'webshopProductSizes',
  initialState: productSizesAdapter.getInitialState(INITIAL_STATE),
  reducers: {
    addProductSize(state, action: PayloadAction<ISize>) {
      productSizesAdapter.addOne(state, action.payload);
    },
    addProductSizes(state, action: PayloadAction<ISize[]>) {
      productSizesAdapter.addMany(state, action.payload);
    },
  },
});

export const { addProductSize, addProductSizes } = productSizesSlice.actions;

export const webshopProductSizesReducer = productSizesSlice.reducer;
