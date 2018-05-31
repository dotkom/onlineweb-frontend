import { ActionTypes } from "./actionTypes";

export interface IAction<T> {
  type: ActionTypes;
  payload: T;
};
