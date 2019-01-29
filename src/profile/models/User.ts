import { FieldOfStudy } from './FieldOfStudy';
import { IMedal } from './Medal';

export type Gender = 'male' | 'female';

export interface IFullProfileUser {
  first_name: string;
  last_name: string;
  readonly username: string;
  readonly ntnu_username: string;
  nickname: string | null;
  readonly year: number;
  email: string;
  readonly online_mail: string | null;
  phone_number: string | null;
  address: string | null;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  positions: IMedal[];
  special_positions: any[];
  rfid: string;
  readonly field_of_study: FieldOfStudy;
  readonly started_date: string;
  readonly compiled: boolean;
  infomail: boolean;
  jobmail: boolean;
  allergies: string;
  mark_rules: boolean;
  gender: Gender;
  /** Defaults to empty string */
  bio: string;
  readonly saldo: number;
  readonly is_committee: boolean;
  readonly is_member: boolean;
  readonly image: string | null;
  readonly has_expiring_membership: boolean;
}

export interface ISearchUser {
  id: number;
  first_name: string;
  last_name: string;
  nickname: string | null;
  online_mail: string | null;
  phone_number: string | null;
  username: string;
  address: string;
  zip_code: string;
  email: string;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  ntnu_username: string;
  field_of_study: FieldOfStudy;
  year: number;
  bio: string;
  positions: IMedal[];
  special_positions: any[];
  image: string;
  started_date: string;
}
