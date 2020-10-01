import React, { FC, ReactNode } from 'react';
import { ISignupEligibility } from 'events/models/Event';

interface IProps {
  isAttending: boolean;
  canAttend: ISignupEligibility | null;
  children?: ReactNode;
}

export const PublicAttendees: FC<IProps> = ({ children, isAttending, canAttend }) => {
  if (!canAttend) return null; // The user is not logged in
  if (!isAttending && !canAttend.status) return null; // The user is not attending, or the user is not allowed to attend the event
  return <>{children}</>;
};
