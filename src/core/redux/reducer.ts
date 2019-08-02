import { combineReducers } from 'redux';

import { GroupsAction, groupsReducer } from 'groups/reducers';
import { PaymentAction, paymentsReducer } from 'payments/reducers';
import { ShopAction, shopReducer } from 'shop/reducers';

export type Action = GroupsAction | PaymentAction | ShopAction;

export const rootReducer = combineReducers({
  groups: groupsReducer,
  payments: paymentsReducer,
  shop: shopReducer,
});
