import { combineReducers } from 'redux';

import { transactionsReducer } from './transactions';

export const paymentsReducer = combineReducers({
  transactions: transactionsReducer,
});
