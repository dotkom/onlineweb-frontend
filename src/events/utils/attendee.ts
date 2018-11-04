import { IAttendanceEvent } from 'events/models/Event';

export const getEventAttendees = (attendance: IAttendanceEvent | null): string => {
  return attendance ? `${attendance.number_of_seats_taken}/${attendance.max_capacity}` : 'ALLE';
};
