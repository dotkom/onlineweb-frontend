import { IsoDateTime } from "common/models/Date";
import { IUser } from "core/models/User";

export type MarkCategory =
  | 'Ingen' 
  | 'Sosialt'
  | 'Bedriftspresentasjon'
  | 'Kurs'
  | 'Tilbakemelding'
  | 'Kontoret'
  | 'Betaling'

export interface IPenalty {
  added_date: IsoDateTime;
  expiration_date: IsoDateTime;
  /** Max length of 255 characters */
  description: string;
}

export interface IMark extends IPenalty {
  /** Max length of 155 characters */
  title: string;
  added_date: IsoDateTime;
  given_by: IUser;
  last_changed_date: IsoDateTime;
  last_changed_by: IUser;
  category: MarkCategory;
}

export interface ISuspension extends IPenalty {
  user: IUser;
  /** Max length of 64 characters */
  title: string;
  active: boolean;
  payment_id: number;
}
