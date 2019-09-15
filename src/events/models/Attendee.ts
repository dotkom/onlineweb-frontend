import { IsoDateTime } from 'common/models/Date';

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
