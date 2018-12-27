export interface ICalendarResult {
  kind: string;
  /** Should be numeric */
  etag: string;
  summary: string;
  description: string;
  /** ISO8601 DateTime */
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: any[];
  nextPageToken: string;
  items: ICalendarItem[];
}

export interface ICalendarItem {
  kind: string;
  /** Should be numeric */
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  /** ISO8601 DateTime */
  created: string;
  /** ISO8601 DateTime */
  updated: string;
  summary: string;
  creator: IGoogleAPICreator;
  organizer: IGoogleAPICreator;
  start: IGoogleAPITime;
  end: IGoogleAPITime;
  iCalUID: string;
  sequence: number;
  reminders: IGoogleAPIReminders;
}

export interface IGoogleAPICreator {
  email: string;
  displayName: string;
  self?: boolean;
}

export interface IGoogleAPITime {
  /** ISO8601 DateTime */
  dateTime: string;
}

export interface IGoogleAPIReminders {
  useDefault: boolean;
}
