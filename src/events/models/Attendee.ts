import { IAttendanceEvent } from './Event';
import { IExtra } from './Extras';

export interface IAttendee {
  event: IAttendanceEvent;
  timestamp: Date;
  attended: boolean;
  paid: boolean;
  note: string;
  extras: IExtra;
  show_as_attending_event: boolean;
}
