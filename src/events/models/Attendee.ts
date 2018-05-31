import { IUser } from "core/models/User";
import { IAttendanceEvent } from "./Event"
import { Extra } from "./Extras"

export type Attendee = {
  event: IAttendanceEvent
  user: IUser
  timestamp: Date
  attended: boolean
  paid: boolean
  note: String
  extras: Extra
  show_as_attending_event: boolean
}