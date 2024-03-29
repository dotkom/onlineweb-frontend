import { State } from 'core/redux/Store';

export const selectIsLoggedIn = () => (state: State): boolean => {
  return state.authentication.loggedIn;
};

export const selectFullName = () => (state: State): string => {
  return state.authentication.user?.name || 'Anonym bruker';
};

export const selectUserImage = () => (state: State): string => {
  return state.authentication.user?.picture || 'Ingen bilde';
};

export const selectUserName = () => (state: State): string => {
  return state.authentication.user?.email || 'anonymous';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const selectIsStaff = () => (_state: State): boolean => {
  // This is temporary until we have a proper way to check if a user is staff
  // return state.authentication.user?.staff || false;
  return true;
};
