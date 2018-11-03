import { IAuthUser } from '../models/User';

export enum ActionType {
  LOG_IN,
  LOG_OUT,
}

export interface IAction<T> {
  type: ActionType;
  payload: T;
}

export interface IState {
  user: IAuthUser;
}

export const initialState: IState = {
  user: {
    first_name: 'anon',
    last_name: 'user',
    username: 'anonymoususer',
    email: 'anon@online.ntnu.no',
    groups: [{ name: 'None', permissions: [] }],
    permissions: ['view_wiki'],
    field_of_study: 0,
  },
};

const rootReducer = (state: IState = initialState, action: IAction<IState>) => {
  switch (action.type) {
    case ActionType.LOG_IN:
      return { ...state, ...action.payload };
    case ActionType.LOG_OUT:
      return { ...state, user: initialState.user };
    default:
      return state;
  }
};

export default rootReducer;
