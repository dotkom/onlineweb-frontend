
import { IUser } from '../models/User';
import { IAction } from '../actions/action';
import { ActionTypes } from '../actions/actionTypes';

export interface IInitialState {
  readonly user: IUser | {};
}

const initialState: IInitialState = {
  user: {},
};

const rootReducer = (state = initialState, action: IAction<any>) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return { ...state, user: action.payload };
    case ActionTypes.SIGN_OUT:
      // Should probably have placeholder user or something
      return {  ...state, user: {} };
    default:
      return state;
  }
};

export default rootReducer;
