import { IdTokenClaims, User } from 'oidc-client-ts';

export interface IAuthUser extends User {
  profile: IAuthProfile;
}

interface IOnlinewebScope {
  field_of_study: string;
  member: boolean;
  rfid: string | null;
  staff: boolean;
  superuser: boolean;
}

/**
 * Profile informastion returned from authenticating with
 * OpenID Connect to Onlineweb4.
 */
export type IAuthProfile = NonNullable<IdTokenClaims> & IOnlinewebScope;

export const isOnlineUser = (user: User | IAuthUser): user is IAuthUser => user.hasOwnProperty('preferred_username');

export interface IUserName {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}
