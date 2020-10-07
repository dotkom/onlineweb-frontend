import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { ISignupEligibility, IAttendanceEvent } from 'events/models/Event';
import AttendButton from './AttendButton';
import UnattendButton from './UnattendButton';

interface IAttendButtonProps {
  canAttend: ISignupEligibility | null;
  event: IAttendanceEvent;
  unattendDeadline: DateTime;
}

const Attendance: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const { canAttend, event, unattendDeadline } = props;
  const { id, is_attendee, is_on_waitlist, what_place_is_user_on_wait_list } = event;
  const currentTime = DateTime.local();

  // The canAttend-object is null if the user is not logged in, else it will always be present.
  if (!canAttend) return <p style={{ textTransform: 'none' }}>Du må være logget inn for å se din status.</p>;

  if ((currentTime < unattendDeadline && is_attendee) || is_on_waitlist) {
    return (
      <UnattendButton eventId={id} isOnWaitList={is_on_waitlist} waitListNumber={what_place_is_user_on_wait_list} />
    );
  }

  // The user is logged in, is attending, but cannot unattend. This is due to expired unattend-possibility.
  if (!canAttend.status && is_attendee) return <p>{`${canAttend.message} Avmeldingsfristen har utløpt.`}</p>;

  // The user is logged in, but cannot attend. The reason is given by the canAttend.message-object from OW4.
  if (!canAttend.status) return <p>{canAttend.message}</p>;

  // Base-case: The user is logged in and can attend!
  return <AttendButton eventId={id} />;
};

export default Attendance;
