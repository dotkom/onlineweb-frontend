import { combineReducers } from 'redux';

import { TransactionAction, transactionsReducer } from './transactions';

export type PaymentAction = TransactionAction;

export const paymentsReducer = combineReducers({
  transactions: transactionsReducer,
});
