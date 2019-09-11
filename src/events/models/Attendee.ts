import { IsoDateTime } from 'common/models/Date';

/** Restricted attendee information, primarily used by Regme */
export interface IAttendee {
  /* Event ID */
  event: number;
  /* ISO8601 formatted datetime string */
  timestamp: string;
  attended: boolean;
  id: number;
}

/** Restricted subset of user data fetched as attendee */
export interface IAttendeeUser {
  first_name: string;
  last_name: string;
}

// Attendee from the registration attendee list endpoint.
export interface IUserAttendee {
  id: number;
  event: number;
  user: IAttendeeUser;
  attended: boolean;
  timestamp: IsoDateTime;
  show_as_attending_event: boolean;
  has_paid: boolean;
}
