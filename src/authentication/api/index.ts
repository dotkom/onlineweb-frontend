import { __CLIENT__ } from 'common/constants/environment';
import { User, UserManager } from 'oidc-client';
import settings from './settings';

/**
 * @summary Basic wrapper for OIDC login.
 * Redirects the user to the authentication page defined in settings.
 */
export const logIn = async () => {
  try {
    if (__CLIENT__) {
      const manager = new UserManager(settings);
      await manager.getUser();
      manager.signinRedirect({ data: window.location.pathname });
    } else {
      throw new Error('Login attempted from server side renderer');
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.error(e);
  }
};

/**
 * @summary Receives the callback from an OIDC login, and returns the user.
 */
export const authCallback = async (): Promise<User | undefined> => {
  try {
    if (__CLIENT__) {
      const manager = new UserManager(settings);
      const user = await manager.signinRedirectCallback();
      return user;
    } else {
      throw new Error('Auth Callback attempted from server side renderer');
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.error(e);
  }
  return;
};

/**
 * @summary Returns user if logged in
 */
export const getUser = async (): Promise<User> => {
  const manager = new UserManager(settings);
  const user = await manager.getUser();
  return user;
};

/**
 * @summary Removes user from storage
 */

export const logOut = async () => {
  try {
    // Should maybe logout from onlineweb aswell
    const manager = new UserManager(settings);
    await manager.removeUser();
  } catch (e) {
    // tslint:disable-next-line no-console
    console.error(e);
  }
};
