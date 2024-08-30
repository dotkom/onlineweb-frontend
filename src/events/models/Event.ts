import { IUserName } from 'authentication/models/User';
import IResponsiveImage from 'common/models/ResponsiveImage';
import { IExtra } from './Extras';

export enum EventTypeEnum {
  NONE,
  SOSIALT,
  BEDPRES,
  KURS,
  UTFLUKT,
  EKSKURSJON,
  INTERNT,
  ANNET,
  KJELLEREN,
}

export type EventType =
  | 'Sosialt'
  | 'Kurs'
  | 'Annet'
  | 'Bedriftspresentasjon'
  | 'Utflukt'
  | 'Ekskursjon'
  | 'Internt'
  | 'Kjelleren';

export const getEventType = (n: number): EventType => {
  switch (n) {
    case 1:
      return 'Sosialt';
    case 2:
      return 'Bedriftspresentasjon';
    case 3:
      return 'Kurs';
    case 4:
      return 'Utflukt';
    case 5:
      return 'Ekskursjon';
    case 6:
      return 'Internt';
    case 7:
      return 'Annet';
    case 8:
      return 'Kjelleren';
    default:
      return 'Annet';
  }
};

export const getEventColor = (n: number | string): string => {
  switch (n) {
    case 0:
      return '#828282';
    case 'Sosialt':
    case 1:
      return '#43B171';
    case 'Bedriftspresentasjon':
    case 2:
      return '#EB536E';
    case 'Kurs':
    case 3:
      return '#127DBD';
    case 'Utflukt':
    case 4:
      return '#FDBD47';
    case 'Ekskursjon':
    case 5:
      return '#2AC6F9';
    case 'Internt':
    case 6:
      return '#E75E3B';
    case 'Annet':
    case 7:
      return '#B36BCD';
    case 'Kjelleren':
    case 8:
      return '#E75E3B';
    default:
      return '#828282';
  }
};

/* TODO: Replace with ICSS exports */
export const EVENT_COLORS = ['#eb536e', '#127dbd', '#43b171', '#fdbd47', '#2ac6f9', '#e75e3b', '#b36bcd'];

/* lighten(EVENT_COLORS, 20%);
   TODO: Replace with ICSS exports */
export const LIGHT_EVENT_COLORS = ['#ef758b', '#4197ca', '#69c18d', '#fdca6c', '#55d1fa', '#ec7e62', '#c289d7'];

export enum EventView {
  IMAGE,
  LIST,
  CALENDAR,
}

export interface ISignupEligibility {
  status: boolean;
  message: string;
  status_code: number;
}

export interface AttendeeInfo {
  is_attendee: boolean;
  is_on_waitlist: boolean;
  is_eligible_for_signup: ISignupEligibility;
}

export interface IEvent {
  id: number;
  title: string;
  registration_start: string;
  registration_end: string;
  slug: string;
  ingress: string;
  ingress_short: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: number;
  event_type_display: string;
  organizer: number;
  author: IUserName | null;
  images: IResponsiveImage[];
  companies: number[];
  is_attendance_event: boolean;
  max_capacity: number | null;
  waitlist: boolean;
  attendee_info: AttendeeInfo | null;
  number_of_seats_taken: number | null;
}

export interface IAttendanceEvent {
  id: number;
  max_capacity: number;
  waitlist: boolean;
  guest_attendance: boolean;
  registration_start: string;
  registration_end: string;
  unattend_deadline: string;
  automatically_set_marks: boolean;
  rule_bundles: number[];
  number_on_waitlist: number;
  number_of_seats_taken: number;
  has_feedback: boolean;
  has_extras: boolean;
  has_reservation: boolean;
  extras: IExtra[];
  payment: number | null;
  feedback: number | null;
  has_postponed_registration: boolean;
  is_marked: boolean;
  is_suspended: boolean;
  is_eligible_for_signup: ISignupEligibility;
  is_attendee: boolean;
  is_on_waitlist: boolean;
  what_place_is_user_on_wait_list: number;
}
