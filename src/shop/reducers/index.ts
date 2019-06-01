import { combineReducers } from 'redux';

import { orderLinesReducer } from './orderLines';

export const shopReducer = combineReducers({
  orderLines: orderLinesReducer,
});
