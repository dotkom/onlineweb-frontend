import { Button, Modal } from '@dotkomonline/design-system';
import { IPublicAttendee } from 'events/models/Attendee';
import { selectPublicAttendeesForEventId } from 'events/selectors/publicAttendee';
import { fetchPublicAttendeesByEventId } from 'events/slices/publicAttendees';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Attendee } from './Attendee';
import style from './PublicAttendees.less';

interface IProps {
  eventId: number;
}

interface IAttendeeListProps {
  attendees: IPublicAttendee[];
}

const AttendeeList: FC<IAttendeeListProps> = ({ attendees }) => (
  <div className={style.grid}>
    {attendees.map((attendee, index) => (
      <Attendee key={attendee.id} attendee={attendee} count={index + 1} />
    ))}
  </div>
);

export const ParticipantsButton: FC<IProps> = ({ eventId }) => {
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
        <AttendeeList attendees={attendees} />
      </Modal>
    </>
  );
};

export default ParticipantsButton;
