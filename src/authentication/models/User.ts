export interface IAuthUser extends User {
  profile: IAuthProfile;
}

interface User {
  id_token: string;
  session_state?: string;
  access_token: string;
  refresh_token?: string;
  token_type: string;
  profile: Profile;
  expires_at: number;
}

export interface Profile {
  sub: number;
  name: string;
  given_name: string;
  family_name: string;
  nickname: string;
  preferred_username: string;
  picture: string;
}

interface IOnlinewebScope {
  field_of_study: string;
  member: boolean;
  rfid: string | null;
  staff: boolean;
  superuser: boolean;
}

interface IEmailScope {
  email: string;
  email_verified: boolean;
}

/**
 * Profile information returned from authenticating with
 * OpenID Connect to Onlineweb4.
 */
export type IAuthProfile = NonNullable<Profile> & IOnlinewebScope & Partial<IEmailScope>;

export const isOnlineUser = (user: User | IAuthUser): user is IAuthUser => user.hasOwnProperty('preferred_username');

export interface IUserName {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}
