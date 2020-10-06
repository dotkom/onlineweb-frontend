import React, { FC } from 'react';
import { useDispatch } from 'core/redux/hooks';
import { removeAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';

interface IAttendButtonProps {
  eventId: number;
  isOnWaitList: boolean;
  waitListNumber: number;
}

const UnattendButton: FC<IAttendButtonProps> = ({ eventId, isOnWaitList, waitListNumber }) => {
  const dispatch = useDispatch();
  const [addMessage] = useToast({ type: 'success', duration: 5000 });
  const signOff = async () => {
    await dispatch(removeAttendeeByEventId(eventId));
    addMessage('Du har blitt meldt av arrangementet');
  };

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
