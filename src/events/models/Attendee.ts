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
