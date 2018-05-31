
import { ICompany } from 'core/models/Company'
import { IUser } from 'core/models/User'
import { Group } from 'core/models/Group'
import { RuleBundle } from 'events/models/RuleBundles'
import { Extra } from 'events/models/Extras'
import { Attendee } from './Attendee';
import IImage from 'common/models/Image'

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
  organizer: Group

  //feedback: Feedback
}

export interface ICompenyEvent extends IEvent {
  company: ICompany
}

export enum EventType {
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

  attendees: [Attendee]
}