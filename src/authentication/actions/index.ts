import { logIn } from '../api';
import { IAuthUser } from '../models/User';
import { ActionType, IAction } from '../reducers';

export const apiLogIn = async (username: string, password: string): Promise<IAction<IAuthUser>> => {
  return {
    type: ActionType.LOG_IN,
    payload: await logIn(username, password),
  };
};
