import { IUser } from '../models/User';
import { ActionTypes } from './actionTypes';

export const logIn = (user: IUser) => ({ type: ActionTypes.SIGN_IN, payload: user });
