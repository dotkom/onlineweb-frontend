import React, { FC, useState } from 'react';
import CaptchaModal from './CaptchaModal';
import { useDispatch } from 'core/redux/hooks';
import { setAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';

interface IAttendButtonProps {
  eventId: number;
}

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const dispatch = useDispatch();
  const { eventId } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addToast, cancelCurrentToast] = useToast({ type: 'basic', duration: 5000 });

  const signUp = async (token: string | null) => {
    if (token) {
      addToast('Melder deg på arrangementet...', { type: 'basic' });
      const res = await dispatch(setAttendeeByEventId({ eventId, captcha: token }));
      cancelCurrentToast();
      if (!res.error) {
        addToast('Du har blitt meldt på arrangementet', { type: 'success' });
      } else {
        addToast('Noe gikk galt under påmeldelse av arrangement', { type: 'error' });
      }
    }
  };
  const toggleModal = () => setShowModal(!showModal);
  const modal = <CaptchaModal showModal={showModal} toggleModal={toggleModal} setRecaptcha={signUp} />;

  return (
    <>
      <Button onClick={toggleModal}>Meld meg på</Button>
      {modal}
    </>
  );
};

export default AttendButton;
