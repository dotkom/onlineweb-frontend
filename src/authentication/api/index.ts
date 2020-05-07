import { __CLIENT__ } from 'common/constants/environment';
import { UserManager } from 'oidc-client';
import settings from './settings';
import { IAuthUser } from 'authentication/models/User';

export const USER_MANAGER = __CLIENT__ ? new UserManager(settings) : null;

/**
 * @summary Basic wrapper for OIDC login.
 * Redirects the user to the authentication page defined in settings.
 */
export const logIn = async () => {
  if (USER_MANAGER) {
    const user = await USER_MANAGER.signinRedirect({ data: window.location.pathname });
    return user;
  }
  return null;
};

/**
 * @summary Returns user if logged in
 */
export const getUser = async (): Promise<IAuthUser | undefined> => {
  if (USER_MANAGER) {
    const user = (await USER_MANAGER.getUser()) as IAuthUser | null;
    return user || undefined;
  }
  return undefined;
};

export const logOut = async () => {
  if (USER_MANAGER) {
    await USER_MANAGER.removeUser();
  }
};
