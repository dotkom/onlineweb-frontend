import { FieldOfStudy } from './FieldOfStudy';
import { IMedal } from './Medal';

export type Gender = 'male' | 'female';

/**
 * Base profile which contains all common fields for profile types.
 */
interface IBaseProfile {
  readonly id: number;
  first_name: string;
  last_name: string;
  readonly username: string;
  readonly ntnu_username: string;
  readonly year: number;
  readonly online_mail: string | null;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  positions: IMedal[];
  special_positions: any[];
  readonly field_of_study: FieldOfStudy;
  readonly started_date: string;
  readonly compiled: boolean;
  bio: string;
  readonly is_committee: boolean;
  readonly is_member: boolean;
  readonly image: string | null;
}

/**
 * Fields on user which can be hidden by Privacy settings.
 */
interface IProfilePrivate {
  address: string | null;
  email: string;
  nickname: string | null;
  phone_number: string | null;
}

/** A basic Profile, just used to create IUserProfile */
type IProfile = IBaseProfile & IProfilePrivate;

/**
 * The full profile of the loggen in user.
 */
export interface IUserProfile extends IProfile {
  allergies: string;
  gender: Gender;
  readonly has_expiring_membership: boolean;
  infomail: boolean;
  jobmail: boolean;
  mark_rules: boolean;
  rfid: string;
  readonly saldo: number;
}

/** Make every field in a type/interface nullable */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/** The public profile for a user */
export type IPublicProfile = IBaseProfile & Nullable<Readonly<IProfilePrivate>>;
