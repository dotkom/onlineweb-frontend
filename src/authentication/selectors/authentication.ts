import anonymousUserImage from 'authentication/assets/user.png';
import { State } from 'core/redux/Store';

export const selectIsLoggedIn = () => (state: State): boolean => {
  return state.authentication.loggedIn;
};

export const selectFullName = () => (state: State): string => {
  return state.authentication.user?.name || 'Anonym bruker';
};

export const selectUserImage = () => (state: State): string => {
  return state.authentication.user?.picture || anonymousUserImage;
};

export const selectUserName = () => (state: State): string => {
  return state.authentication.user?.preferred_username || 'anonymous';
};
