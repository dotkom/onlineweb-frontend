import { combineReducers } from 'redux';

import { PriceAction, priceReducer } from './price';
import { TransactionAction, transactionsReducer } from './transactions';

export type PaymentAction = TransactionAction | PriceAction;

export const paymentsReducer = combineReducers({
  transactions: transactionsReducer,
  price: priceReducer,
});
