import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';

import { retrieveProduct, listProducts } from '../api/products';
import { IProduct } from '../models';
import { addProductCategories, addProductCategory } from './productCategory';
import { addProductSizes } from './productSize';

const productsAdapter = createEntityAdapter<IProduct>({
  sortComparer: (productA, productB) => {
    return productA.name.localeCompare(productB.name);
  },
});

export const productSelectors = productsAdapter.getSelectors<State>((state) => state.webshopProducts);

export const fetchProductById = createAsyncThunk(
  'webshopProducts/fetchById',
  async (productId: number, { dispatch }) => {
    const response = await retrieveProduct(productId);
    if (response.status === 'success') {
      const product = response.data;
      dispatch(addProductCategory(product.category));
      const sizes = product.product_sizes.flatMap((size) => size);
      dispatch(addProductSizes(sizes));
      return product;
    } else {
      throw response.errors;
    }
  }
);

export const fetchProducts = createAsyncThunk('webshopProducts/fetchList', async (_, { dispatch }) => {
  const response = await listProducts();
  if (response.status === 'success') {
    const products = response.data.results;
    const categories = products.flatMap((product) => product.category);
    dispatch(addProductCategories(categories));
    const sizes = products.flatMap((product) => product.product_sizes.flatMap((size) => size));
    dispatch(addProductSizes(sizes));
    return products;
  } else {
    throw response.errors;
  }
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IProduct>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const productsSlice = createSlice({
  name: 'webshopProducts',
  initialState: productsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = 'idle';
      productsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = 'idle';
      const products = action.payload;
      productsAdapter.addMany(state, products);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const webshopProductsReducer = productsSlice.reducer;
