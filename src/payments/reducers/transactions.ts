import { batch } from 'react-redux';
import { Reducer } from 'redux';

import { Dispatch } from 'core/redux/Store';
import { getAllTransactions } from 'payments/api/paymentTransaction';
import { IPaymentTransaction } from 'payments/models/PaymentTransaction';

export interface ITransactionsState {
  transactions: IPaymentTransaction[];
  fetching: boolean;
}

export const INITIAL_STATE: ITransactionsState = {
  transactions: [],
  fetching: true, // The application starts in the mode of fetching
};

export enum Type {
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
  FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS',
  SET_FETCHING = 'SET_FETCHING_TRANSACTIONS',
}

export interface ISetTransactionsAction {
  type: Type.SET_TRANSACTIONS;
  transactions: IPaymentTransaction[];
}

export interface IFetchTransactionsAction {
  type: Type.FETCH_TRANSACTIONS;
}

export interface ISetFetchingAction {
  type: Type.SET_FETCHING;
  status: boolean;
}

export type TransactionAction = ISetTransactionsAction | IFetchTransactionsAction | ISetFetchingAction;

export const transactionsReducer: Reducer<ITransactionsState, TransactionAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Type.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions,
      };
    case Type.FETCH_TRANSACTIONS:
      return {
        ...state,
      };
    case Type.SET_FETCHING:
      return {
        ...state,
        fetching: action.status,
      };
    default:
      return state;
  }
};

export const fetchTransactions = () => async (dispatch: Dispatch) => {
  dispatch({ type: Type.SET_FETCHING, status: true });
  try {
    const transactions = await getAllTransactions();
    batch(() => {
      dispatch({ type: Type.SET_TRANSACTIONS, transactions });
      dispatch({ type: Type.SET_FETCHING, status: false });
    });
  } catch (err) {
    batch(() => {
      dispatch({ type: Type.SET_FETCHING, status: false });
    });
  }
};
