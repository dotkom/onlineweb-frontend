import { IUserName } from 'authentication/models/User';

export interface IAttendee {
  id: number;
  event: number;
  user: IUserName;
  attended: boolean;
  timestamp: string;
  show_as_attending_event: boolean;
  allow_pictures: boolean;
  paid: boolean;
  has_paid: boolean;
  note: string;
}

export interface IPublicAttedee {
  id: number;
  event: number;
  is_visible: boolean;
  full_name: string;
  year_of_study: number;
  field_of_study: string;
}

export interface IAttendResponse {
  allow_pictures: boolean;
  show_as_attending_event: boolean;
  note: string;
}
