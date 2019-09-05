import { IPaymentPrice } from "payments/models/Payment";
import { Reducer } from 'redux';

export interface IPriceState {
  price?: IPaymentPrice;
  fetching: boolean;
}

export const INITIAL_STATE: IPriceState = {
  fetching: true,
};

export enum Type {
  SET_PAYMENT_PRICE = 'SET_PAYMENT_PRICE',
  FETCH_PAYMENT_PRICE = 'FETCH_PAYMENT_PRICE',
  SET_FETCHING_PRICE = 'SET_FETCHING_PRICE',
}

export interface ISetPaymentPriceAction {
  type: Type.SET_PAYMENT_PRICE;
  price: IPaymentPrice;
}

export interface IFetchPaymentPriceAction {
  type: Type.FETCH_PAYMENT_PRICE;
}

export interface ISetFetchingPriceAction {
  type: Type.SET_FETCHING_PRICE;
  status: boolean;
}

export type PriceAction = ISetPaymentPriceAction | IFetchPaymentPriceAction | ISetFetchingPriceAction;

export const priceReducer: Reducer<IPriceState, PriceAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Type.SET_PAYMENT_PRICE:
      return { ...state, price: action.price };

    case Type.SET_FETCHING_PRICE:
      return { ...state, fetching: action.status };

    default:
      return state;
  }
};
