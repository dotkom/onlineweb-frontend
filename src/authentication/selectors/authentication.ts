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

export const selectIsStaff = () => (state: State): boolean => {
  return state.authentication.user?.staff || false;
};
