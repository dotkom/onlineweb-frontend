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
  const [addToast, cancelCurrentToast] = useToast({ type: 'basic', duration: 5000 });
  const signOff = async () => {
    addToast('Melder deg av arrangementet...');
    const res = await dispatch(removeAttendeeByEventId(eventId));
    cancelCurrentToast();
    if (!res.error) {
      addToast('Du har blitt meldt av arrangementet', { type: 'success' });
    } else {
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
