import React, { FC, useState } from 'react';
import Button from 'core/components/errors/NotAuthenticated/Button';
import CaptchaModal from './CaptchaModal';
import { useDispatch } from 'core/redux/hooks';
import { setAttendeeByEventId } from 'events/slices/attendees';

interface IAttendButtonProps {
  eventId: number;
}

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const dispatch = useDispatch();
  const { eventId } = props;
  const [showModal, setShowModal] = useState<boolean>(false);

  const signUp = (token: string | null) => {
    if (token) {
      dispatch(setAttendeeByEventId({ eventId, captcha: token }));
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
