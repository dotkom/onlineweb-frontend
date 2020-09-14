import React, { FC } from 'react';
import Button from 'core/components/errors/NotAuthenticated/Button';
import { useDispatch } from 'core/redux/hooks';
import { removeAttendeeByEventId } from 'events/slices/attendees';

interface IAttendButtonProps {
  eventId: number;
  isOnWaitList: boolean;
  waitListNumber: number;
}

const UnattendButton: FC<IAttendButtonProps> = ({ eventId, isOnWaitList, waitListNumber }) => {
  const dispatch = useDispatch();
  const signOff = () => dispatch(removeAttendeeByEventId(eventId));

  if (!isOnWaitList) {
    return <Button onClick={signOff}>Meld meg av</Button>;
  }
  return (
    <>
      <p>{`Du er nummer ${waitListNumber} på venteliste.`}</p>
      <Button onClick={signOff}>Meld meg av</Button>
    </>
  );
};

export default UnattendButton;
