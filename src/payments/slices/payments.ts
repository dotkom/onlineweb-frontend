import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';

import { State } from 'core/redux/Store';
import { getPaymentForEvent } from 'payments/api/payments';
import { IPayment } from 'payments/models/Payment';

const paymentsAdapter = createEntityAdapter<IPayment>();

export const paymentSelectors = paymentsAdapter.getSelectors<State>((state) => state.payments);

export const fetchPaymentEventById = createAsyncThunk('payments/fetchByEventId', async (eventId: number) => {
  const payment = await getPaymentForEvent(eventId);
  return payment;
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IPayment>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: paymentsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPaymentEventById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPaymentEventById.fulfilled, (state, action) => {
      state.loading = 'idle';
      paymentsAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchPaymentEventById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    });
  },
});

export const paymentsReducer = paymentsSlice.reducer;
