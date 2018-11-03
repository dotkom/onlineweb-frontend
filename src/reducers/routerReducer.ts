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

const routerReducer = (state: IState = initialState, action: IAction<IState>) => {
  switch (action.type) {
    case ActionType.LOCATION_CHANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default rootReducer;
