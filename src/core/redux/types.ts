import { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Action as AllActions, rootReducer } from './reducer';

export type State = ReturnType<typeof rootReducer>;
export type Action = AllActions;
export type Store = ReduxStore<State, Action>;
export type Dispatch = ThunkDispatch<State, undefined, Action>;
export type ThunkResult<R> = ThunkAction<R, State, undefined, Action>;
// tslint:disable-next-line no-any
export type Thunk<T = void> = (...args: any[]) => (dispatch: Dispatch, getState: Store['getState']) => Promise<T>;
