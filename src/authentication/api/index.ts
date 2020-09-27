import { IAuthUser } from 'authentication/models/User';
import { signIn, signOut, getSession } from 'next-auth/client';
/**
 * @summary Basic wrapper for OIDC login.
 * Redirects the user to the authentication page defined in settings.
 */

export const logIn = async () => {
  return await signIn('onlineweb4');
};

/**
 * @summary Returns user if logged in
 */
export const getUser = async (): Promise<IAuthUser | undefined> => {
  const session = await getSession();
  return (session?.user as unknown) as IAuthUser;
};

/**
 * @summary Removes user from storage
 */

export const logOut = async () => {
  return await signOut();
};
