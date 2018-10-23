import { IGroup } from 'core/models/Group';
import { Permission } from 'core/models/Permission';
<<<<<<< 3e8809a5d36ae5659f867926f74f6e4cecd8fb2f
import { Email, FieldOfStudy, IUser } from 'core/models/User';
=======
import { User } from 'oidc-client';
>>>>>>> Configure authentication api to use oidc manager, and set up authentication model for oidc

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
