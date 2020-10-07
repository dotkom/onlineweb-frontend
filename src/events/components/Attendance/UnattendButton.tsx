import React, { FC } from 'react';
import { useDispatch } from 'core/redux/hooks';
import { removeAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { unwrapResult } from '@reduxjs/toolkit';

interface IAttendButtonProps {
  eventId: number;
  isOnWaitList: boolean;
  waitListNumber: number;
}

const UnattendButton: FC<IAttendButtonProps> = ({ eventId, isOnWaitList, waitListNumber }) => {
  const dispatch = useDispatch();
  const [addToast] = useToast({ type: 'success', duration: 5000 });
  const signOff = async () => {
    try {
      await dispatch(removeAttendeeByEventId(eventId)).then(unwrapResult);
      addToast('Du har blitt meldt av arrangementet');
    } catch (err) {
      addToast('Noe gikk galt under avmeldelse av arrangementet, prøv igjen senere', { type: 'error' });
    }
  };

  return (
    <>
      {isOnWaitList ? <p>{`Du er nummer ${waitListNumber} på venteliste.`}</p> : null}
      <Button color="secondary" onClick={signOff}>
        Meld meg av
      </Button>
    </>
  );
};

export default UnattendButton;
