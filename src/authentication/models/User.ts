import { User, Profile } from 'oidc-client';

export interface IAuthUser extends User {
  profile: IAuthProfile;
}

/**
 * Profile informastion returned from authenticating with
 * OpenID Connect to Onlineweb4.
 */
export type IAuthProfile = NonNullable<Profile>;

export const isOnlineUser = (user: User | IAuthUser): user is IAuthUser => user.hasOwnProperty('preferred_username');
