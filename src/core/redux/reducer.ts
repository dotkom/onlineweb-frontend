import { combineReducers } from 'redux';

import { PaymentAction, paymentsReducer } from 'payments/reducers';
import { ShopAction, shopReducer } from 'shop/reducers';

export type Action = PaymentAction | ShopAction;

export const rootReducer = combineReducers({
  payments: paymentsReducer,
  shop: shopReducer,
});
