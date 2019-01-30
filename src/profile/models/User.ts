import { IMedal } from './Medal';

export interface IFullProfileUser {
  first_name: string;
  last_name: string;
  username: string;
  ntnu_username: string;
  nickname: string;
  year: number;
  email: string;
  online_mail: string;
  phone_number: string;
  address: string;
  website: string;
  github: string;
  linkedin: string;
  positions: IMedal[];
  special_positions: any[];
  rfid: string;
}

export interface ISearchUser {
  first_name: string;
  last_name: string;
  nickname: string | null;
  online_mail: string | null;
  phone_number: string | null;
  username: string;
}
