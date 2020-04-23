import { Profile, User } from 'oidc-client';

export interface IAuthUser extends User {
  profile: IAuthProfile;
}

/**
 * Profile informastion returned from authenticating with
 * OpenID Connect to Onlineweb4.
 */
export type IAuthProfile = NonNullable<Profile>;

export const isOnlineUser = (user: User | IAuthUser): user is IAuthUser => user.hasOwnProperty('preferred_username');

export interface IUserName {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}
