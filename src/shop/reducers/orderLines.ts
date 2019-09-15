import { batch } from 'react-redux';
import { Reducer } from 'redux';

import { getUser } from 'authentication/api';
import { Thunk } from 'core/redux/types';
import { getOrders } from 'profile/api/orders';
import { IOrderLine } from 'shop/models';

export type OrderLinesStatus = 'fetching' | 'error' | 'ready';

export interface IApiError<T extends object> {
  error?: string;
  message?: string;
  non_field_errors?: string;
  object?: { [Key in keyof T]?: string };
}

export interface IOrderLinesState {
  orderLines: IOrderLine[];
  status: OrderLinesStatus;
  errors?: IApiError<IOrderLine>;
}

const INITIAL_STATE: IOrderLinesState = {
  status: 'fetching',
  orderLines: [],
};

export enum Type {
  FETCH_ORDER_LINES = 'FETCH_ORDER_LINES',
  SET_ORDER_LINES = 'SET_ORDER_LINES',
  SET_STATUS = 'SET_STATUS_ORDER_LINES',
  SET_ERRORS = 'SET_ORDER_LINES_ERRORS',
}

export interface IFetchOrderLinesAction {
  type: Type.FETCH_ORDER_LINES;
}

export interface ISetOrderLinesAction {
  type: Type.SET_ORDER_LINES;
  orderLines: IOrderLine[];
}

export interface ISetStatusAction {
  type: Type.SET_STATUS;
  status: OrderLinesStatus;
}

export interface ISetErrorsAction {
  type: Type.SET_ERRORS;
  errors?: IApiError<IOrderLine>;
}

export type OrderLineAction = IFetchOrderLinesAction | ISetStatusAction | ISetOrderLinesAction | ISetErrorsAction;

export const orderLinesReducer: Reducer<IOrderLinesState, OrderLineAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Type.SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case Type.SET_ORDER_LINES:
      return {
        ...state,
        orderLines: action.orderLines,
      };
    case Type.SET_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case Type.FETCH_ORDER_LINES:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const fetchOrderLines: Thunk = () => async (dispatch) => {
  dispatch({ type: Type.SET_STATUS, status: 'fetching' });
  try {
    const user = await getUser();
    const orderLines = await getOrders(user);
    batch(() => {
      dispatch({ type: Type.SET_ORDER_LINES, orderLines });
      dispatch({ type: Type.SET_STATUS, status: 'ready' });
    });
  } catch (errors) {
    batch(() => {
      dispatch({ type: Type.SET_STATUS, status: 'ready' });
      dispatch({ type: Type.SET_ERRORS, errors });
    });
  }
};
