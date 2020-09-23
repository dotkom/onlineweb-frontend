import { __CLIENT__ } from 'common/constants/environment';
import { UserManager } from 'oidc-client';
import settings from './settings';
import { IAuthUser } from 'authentication/models/User';
import { signIn, signOut, useSession, session } from 'next-auth/client';
/**
 * @summary Basic wrapper for OIDC login.
 * Redirects the user to the authentication page defined in settings.
 */

export const USER_MANAGER = __CLIENT__ ? new UserManager(settings) : null;

export const logIn = async () => {
  return await signIn()
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
  const [session, loading] = useSession();
  return session.user as unknown as IAuthUser;
  if (USER_MANAGER) {
    const user = (await USER_MANAGER.getUser()) as IAuthUser | null;
    return user || undefined;
  }
  return undefined;
};

/**
 * @summary Removes user from storage
 */

export const logOut = async () => {
  return await signOut();
  if (USER_MANAGER) {
    await USER_MANAGER.signoutRedirect();
  }
};
