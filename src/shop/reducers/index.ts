import { combineReducers } from 'redux';

import { OrderLineAction, orderLinesReducer } from './orderLines';

export type ShopAction = OrderLineAction;

export const shopReducer = combineReducers({
  orderLines: orderLinesReducer,
});
