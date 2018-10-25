import settings from './settings';
import { UserManager, User } from 'oidc-client';

const MANAGER = new UserManager(settings);

/**
 * @summary Basic wrapper for OIDC login.
 * Redirects the user to the authentication page defined in settings.
 */
export const logIn = async () => {
  try {
    await MANAGER.getUser();
    MANAGER.signinRedirect();
  } catch (e) {
    console.error(e);
  }
};

/**
 * @summary Receives the callback from an OIDC login, and returns the user.
 */
export const authCallback = async (): Promise<User> => {
  const user = await MANAGER.signinRedirectCallback();
  return user;
};
