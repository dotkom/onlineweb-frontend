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
  const [addMessage] = useToast({ type: 'success', duration: 5000 });

  const signUp = async (token: string | null) => {
    if (token) {
      await dispatch(setAttendeeByEventId({ eventId, captcha: token }));
      addMessage('Du har blitt meldt på arrangementet');
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
