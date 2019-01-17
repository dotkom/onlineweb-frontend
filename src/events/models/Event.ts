import IImage, { DEFAULT_EVENT_IMAGE } from 'common/models/Image';
import { ICompany } from 'core/models/Company';
import { IGroup } from 'core/models/Group';
import { IUser } from 'core/models/User';
import { IExtra } from 'events/models/Extras';
import { IRuleBundle } from 'events/models/RuleBundles';
import { IAttendee } from './Attendee';

export interface IEventViewProps {
  accessible: boolean;
}

export enum EventTypeEnum {
  NONE,
  SOSIALT,
  BEDPRES,
  KURS,
  UTFLUKT,
  EKSKURSJON,
  INTERNT,
  ANNET,
}

export type EventType = 'Sosialt' | 'Kurs' | 'Annet' | 'Bedriftspresentasjon' | 'Utflukt' | 'Ekskursjon' | 'Internt';

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
    default:
      return 'Annet';
  }
};

export const getEventColor = (n: number): string => {
  switch (n) {
    case 0:
      return '#828282';
    case 1:
      return '#43B171';
    case 2:
      return '#EB536E';
    case 3:
      return '#127DBD';
    case 4:
      return '#FDBD47';
    case 5:
      return '#2AC6F9';
    case 6:
      return '#E75E3B';
    case 7:
      return '#B36BCD';
    default:
      return '#828282';
  }
};

/* TODO: Replace with ICSS exports */
export const EVENT_COLORS = ['#eb536e', '#127dbd', '#43b171', '#fdbd47', '#2ac6f9', '#e75e3b', '#b36bcd'];

/* lighten(EVENT_COLORS, 20%);
   TODO: Replace with ICSS exports */
export const LIGHT_EVENT_COLORS = ['#ef758b', '#4197ca', '#69c18d', '#fdca6c', '#55d1fa', '#ec7e62', '#c289d7'];

export const mockEvent: INewEvent = {
  absolute_url: '',
  attendance_event: null,
  organizer_name: '',
  company_event: [],
  description: '',
  event_end: '',
  event_start: '',
  event_type: 0,
  id: 0,
  image: DEFAULT_EVENT_IMAGE,
  ingress: '',
  ingress_short: '',
  location: '',
  slug: '',
  title: '',
};

export enum EventView {
  IMAGE,
  LIST,
  CALENDAR,
}

export interface IFrontpageEvent {
  eventUrl: string;
  startDate: string;
  author: IUser;
  title: string;
  event_start: Date;
  event_end: Date;
  ingress: string; // TextField type?
  description: string; // TextField type?
  images: IImage[]; // StaticContent URL?
  event_type: EventType;
}

export interface IEvent {
  author: IUser;
  title: string;
  event_start: Date;
  event_end: Date;
  location: string; // Location type?
  ingress_short: string; // TextField type?
  ingress: string; // TextField type?
  description: string; // TextField type?
  image: string; // StaticContent URL?
  event_type: EventType;
  organizer: IGroup;

  // feedback: Feedback
}

export interface ICompanyEvent extends IEvent {
  company: ICompany;
}

export enum EEventType {
  COMPANYPRESENTATION,
  COMPANYCOURSE,
  SOCIAL,
  OTHER,
}

export interface IAttendanceEvent {
  max_capacity: number; // Positive Integer
  waitlist: boolean;
  guest_attendance: boolean;
  registration_start: string;
  unattend_deadline: string;
  registration_end: string;
  number_of_seats_taken: number;
  automatically_set_marks: boolean;
  marks_has_been_set: boolean;
  number_on_waitlist: number;
  rule_bundles: IRuleBundle[]; // ManyToMany
  extras: IExtra[]; // ManyToMany
  // payments: [Payment] // GenericRelation

  attendees: IAttendee[];
}

export interface INewAttendanceEvent {
  automatically_set_marks: boolean;
  guest_attendance: boolean;
  max_capacity: number;
  registration_end: string;
  registration_start: string;
  rule_bundles: any[];
  unattend_deadline: string;
  waitlist: boolean;
}

export interface INewEvent {
  absolute_url: string;
  attendance_event: IAttendanceEvent | null;
  company_event: ICompanyEvent[];
  description: string;
  organizer_name: string;
  event_end: string;
  event_start: string;
  event_type: number;
  id: number;
  image: IImage | null;
  ingress: string;
  ingress_short: string;
  location: string;
  slug: string;
  title: string;
}
