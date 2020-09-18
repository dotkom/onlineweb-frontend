import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';

import { IAuthUser, IAuthProfile } from 'authentication/models/User';

// https://github.com/microsoft/TypeScript/issues/27930
type JSON<T> = string & { __JSON__: T };
declare const JSON: {
  parse: <T>(str: JSON<T>) => T;
  stringify: <T>(obj: T) => JSON<T>;
};

interface IState {
  loading: 'idle' | 'pending';
  error: null | SerializedError;
  user: IAuthProfile | null;
  loggedIn: boolean;
  token: string | null;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  token: null,
  user: null,
  loggedIn: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: INITIAL_STATE,
  reducers: {
    userExpired(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      state.loading = 'idle';
    },
    userSilentRenewError(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      state.loading = 'idle';
    },
    userSessionTerminated(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      state.loading = 'idle';
    },
    userSignOut(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      state.loading = 'idle';
    },
    userSignIn(state, action: PayloadAction<JSON<IAuthUser>>) {
      // https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
      const user = JSON.parse(action.payload);
      state.user = user.profile;
      state.loggedIn = true;
      state.token = user.access_token;
      state.loading = 'idle';
    },
    userLoading(state) {
      state.loading = 'pending';
    },
  },
});

export const authenticationActions = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
