import { User } from 'oidc-client';

export interface IAuthUser extends User {
  profile: IAuthProfile;
}

/**
 * Profile informastion returned from authenticating with
 * OpenID Connect to Onlineweb4.
 */
export interface IAuthProfile {
  /** Unix timestamp when the user was authenticated */
  auth_time: number;
  /** Last name of the user */
  family_name: string;
  /** First name(s) of the user */
  given_name: string;
  /** Full name of the user */
  name: string;
  /** Personally set nickname */
  nickname: string;
  /** Full URL to profile picture */
  picture: string;
  /** Onlineweb username */
  preferred_username: string;
  /** Onlineweb UserId */
  sub: string;
}
