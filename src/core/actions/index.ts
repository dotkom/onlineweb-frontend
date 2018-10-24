
import { ActionTypes } from './actionTypes';
import { IUser } from '../models/User';

export const logIn = (user: IUser) => ({ type: ActionTypes.SIGN_IN, payload: user });
