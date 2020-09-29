import React, { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'core/redux/hooks';
import { selectPublicAttendeesForEventId } from 'events/selectors/publicAttendee';
import { fetchPublicAttendeesByEventId } from 'events/slices/publicAttendees';

import { Attendee } from './Attendee';
import style from './PublicAttendees.less';
import { IPublicAttendee } from 'events/models/Attendee';
import { Button, Modal } from '@dotkomonline/design-system';

interface IProps {
  eventId: number;
}

const attendeeList = (attendees: IPublicAttendee[]) => (
  <div className={style.grid}>
    {attendees.map((attendee, index) => (
      <Attendee key={attendee.id} attendee={attendee} count={index + 1} />
    ))}
  </div>
);

export const PublicAttendees: FC<IProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const attendees = useSelector(selectPublicAttendeesForEventId(eventId));
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    dispatch(fetchPublicAttendeesByEventId(eventId));
  }, [eventId]);

  return (
    <>
      <Button onClick={toggleModal}>Vis påmeldte</Button>
      <Modal open={showModal} onClose={toggleModal}>
        {attendeeList(attendees)}
      </Modal>
    </>
  );
};
