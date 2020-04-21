import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';

import { retrieveRuleBundle } from 'events/api/ruleBundles';
import { IRuleBundle } from 'events/models/RuleBundles';

const ruleBundlesAdapter = createEntityAdapter<IRuleBundle>();

export const ruleBundleSelectors = ruleBundlesAdapter.getSelectors<State>((state) => state.ruleBundles);

export const fetchRuleBundleById = createAsyncThunk('ruleBundles/fetchById', async (bundleId: number) => {
  const response = await retrieveRuleBundle(bundleId);
  if (response.status === 'success') {
    return response.data;
  } else {
    throw response.errors;
  }
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IRuleBundle>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const ruleBundlesSlice = createSlice({
  name: 'ruleBundles',
  initialState: ruleBundlesAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRuleBundleById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchRuleBundleById.fulfilled, (state, action) => {
      state.loading = 'idle';
      ruleBundlesAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchRuleBundleById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const ruleBundlesReducer = ruleBundlesSlice.reducer;
