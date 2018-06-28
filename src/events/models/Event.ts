
import { ICompany } from 'core/models/Company'
import { IUser } from 'core/models/User'
import { IGroup } from 'core/models/Group'
import { RuleBundle } from 'events/models/RuleBundles'
import { Extra } from 'events/models/Extras'
import { Attendee } from './Attendee';
import IImage from 'common/models/Image'

export type EventType = 
  | 'Sosialt'
  | 'Kurs'
  | 'Annet'
  | 'Bedriftspresentasjon'

export const getEventType = (n: number): EventType => {
  switch (n) {
    case 1: return 'Sosialt';
    case 2: return 'Bedriftspresentasjon';
    case 3: return 'Kurs';
    case 4: return 'Annet';
    default: return 'Annet';
  }
}

export const getEventColor = (n: number): string => {
  switch (n) {
    case 1: return '#EB536E';
    case 2: return '#43B171';
    case 3: return '#127DBD';
    case 4: return '#FDBD47';
    case 5: return '#2AC6F9';
    case 6: return '#E75E3B';
    case 7: return '#B36BCD';
    default: return 'gray';
  }
} 

export interface IFrontpageEvent {
  eventUrl: string
  startDate: string
  author: IUser
  title: string
  event_start: Date
  event_end: Date
  ingress: string // TextField type?
  description: string // TextField type?
  images: IImage[] // StaticContent URL?
  event_type: EventType
}

export interface IEvent {
  author: IUser
  title: string
  event_start: Date
  event_end: Date
  location: string // Location type?
  ingress_short: string // TextField type?
  ingress: string // TextField type?
  description: string // TextField type?
  image: string // StaticContent URL?
  event_type: EventType
  organizer: IGroup

  //feedback: Feedback
}

export interface ICompenyEvent extends IEvent {
  company: ICompany
}

export enum EEventType {
  COMPANYPRESENTATION, COMPANYCOURSE, SOCIAL, OTHER
}

export interface IAttendanceEvent {
  max_capacity: number // Positive Integer
  waitlist: boolean
  guest_attendance: boolean
  registration_start: Date
  unattend_deadline: Date
  registration_end: Date

  automatically_set_marks: boolean
  marks_has_been_set: boolean

  rule_bundles: [RuleBundle] // ManyToMany
  extras: [Extra] // ManyToMany
  //payments: [Payment] // GenericRelation

  attendees: Attendee[]
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
  company_event: ICompenyEvent[];
  description: string;
  event_end: string;
  event_start: string;
  event_type: number;
  id: number;
  image: string | null;
  ingress: string;
  ingress_short: string;
  location: string;
  slug: string;
  title: string;
}
