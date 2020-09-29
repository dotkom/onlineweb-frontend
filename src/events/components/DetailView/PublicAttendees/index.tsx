import { ISignupEligibility } from 'events/models/Event';
import React, { FC } from 'react';
import ParticipantsButton from './ParticipantsButton';
interface IProps {
  eventId: number;
  isAttending: boolean;
  canAttend: ISignupEligibility | null;
}

export const PublicAttendees: FC<IProps> = ({ eventId, isAttending, canAttend }) => {
  if (!canAttend) return null; // The user is not logged in
  if (!isAttending && !canAttend.status) return null; // The user is not attending, or the user is not allowed to attend the event
  return <ParticipantsButton eventId={eventId} />;
};
