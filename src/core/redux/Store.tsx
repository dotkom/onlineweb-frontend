import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk';

import { paymentsReducer } from 'payments/reducers';
import { shopReducer } from 'shop/reducers';

export const rootReducer = combineReducers({
  payments: paymentsReducer,
  shop: shopReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Action = Parameters<typeof rootReducer>[1];

export const initStore = (initialState?: State) =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk as ThunkMiddleware<State, Action>),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

export type Store = ReturnType<typeof initStore>;
export type Dispatch = Store['dispatch'];
export type ThunkResult<R> = ThunkAction<R, State, undefined, Action>;
// tslint:disable-next-line no-any
export type Thunk<T = void> = (...args: any[]) => (dispatch: Dispatch, getState: Store['getState']) => Promise<T>;

export const store = initStore();

export const StoreProvider: FC = (props) => {
  return <Provider {...props} store={store} />;
};
