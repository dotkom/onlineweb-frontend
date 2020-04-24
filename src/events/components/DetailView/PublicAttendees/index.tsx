import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'core/redux/hooks';
import { selectPublicAttendeesForEventId } from 'events/selectors/publicAttendee';
import { fetchPublicAttendeesByEventId } from 'events/slices/publicAttendees';

import { Attendee } from './Attendee';
import style from './PublicAttendees.less';

interface IProps {
  eventId: number;
}

export const PublicAttendees: FC<IProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const attendees = useSelector(selectPublicAttendeesForEventId(eventId));

  useEffect(() => {
    dispatch(fetchPublicAttendeesByEventId(eventId));
  }, [eventId]);

  return (
    <div className={style.grid}>
      {attendees.map((attendee, index) => (
        <Attendee key={attendee.id} attendee={attendee} count={index + 1} />
      ))}
    </div>
  );
};
