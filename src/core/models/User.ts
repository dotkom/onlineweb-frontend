import { IGroup } from "./Group";
import { IsoDateTime } from "common/models/Date";
import { Url } from "common/models/Url";

/**
 * string formatted as:
 * <identifier>@<domain>
 */
export type Email = string;

/**
 * String formatted as:
 * <firstname>.<?middlename>.<lastname>@online.ntnu.no
 */
export type OnlineMail = Email;

/**
 * Number as a string, formatted as:
 * "^/((\+|00)47\ ?)?(\d{8}|(\d{2}\ \d{2}\ \d{2}\ \d{2})|(\d{3}\ \d{2}\ \d{3}))/g"
 * 
 * This is probably way too comlicated and needs to be narrowed down to something else?
 */
export type PhoneNumber = string;

/**
 * 
 */
export type Gender = 'male' | 'female' | null;

/**
 * Number as a string, defined as:
 * "^/\d{4}/g"
 */
export type ZipCode = string;

/**
 * Number as a string, defined as:
 * "^/\d{n}/g"
 */
export type RFID = string;

/**
 * Defined as a number between 0 and 6? 
 */
export type FieldOfStudy = number;

export interface IUser {
  first_name: string;
  last_name: string;
  username: string;
  email: Email;
  groups: IGroup[];
}

export interface IPublicUser extends IUser {
  started_date: IsoDateTime;
  compiled: boolean;
  infomail: boolean;
  jobmail: boolean;
  online_mail: OnlineMail;
  phone_number: PhoneNumber;
  address: null;
  zip_code: ZipCode;
  allergies: string;
  mark_rules: boolean;
  nickname: string;
  website: Url;
  github: Url;
  linkedin: Url;
  gender: Gender;
  bio: string;
  saldo: number;
  ntnu_username: string;
}

export interface IPrivateUser extends IPublicUser {
  rfid: RFID;
}

/**
 * OnlineUser
 */
/*export class User implements IOnlineUser {
  public name: string
  public firstName: string
  public lastName: string
  public rfid: string

  public constructor(u: IOnlineUser) {
    Object.assign(this, u)
  } 

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  public get displayName(): string {
    return this.name
  }
}*/
