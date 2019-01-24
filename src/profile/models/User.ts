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
  name: string;
  phone: string;
  mail: string;
  image: string;
}
