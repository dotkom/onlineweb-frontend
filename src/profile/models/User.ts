import { IMedal } from './Medal';

export interface IFullProfileUser {
  first_name: string;
  last_name: string;
  username: string;
  ntnu_username: string;
  kallenavn: string;
  grade: number;
  primary_email: string;
  gsuite_username: string;
  phone_number: string;
  address: string;
  committees: IMedal[];
  external: {
    github: string,
    linkedin: string,
    homepage: string,
  };
}

export interface ISearchUser {
  name: string;
  phone: string;
  mail: string;
  image: string;
}
