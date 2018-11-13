import rootReducer from 'core/reducers';

export enum ActionType {
  LOCATION_CHANGE,
}

export interface IAction<T> {
  type: ActionType;
  payload: T;
}

export interface IState {
  location: any;
}

export const initialState: IState = {
  location: {},
};

export default rootReducer;
