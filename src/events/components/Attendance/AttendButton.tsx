import React, { FC, useState } from 'react';
import CaptchaModal from './CaptchaModal';
import { useDispatch } from 'core/redux/hooks';
import { setAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { unwrapResult } from '@reduxjs/toolkit';
import style from './attendance.less';

interface IAttendButtonProps {
  eventId: number;
}

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const dispatch = useDispatch();
  const { eventId } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addToast] = useToast({ type: 'success', duration: 5000 });

  const signUp = async (token: string | null) => {
    if (token) {
      try {
        await dispatch(setAttendeeByEventId({ eventId, captcha: token })).then(unwrapResult);
        addToast('Du har blitt meldt på arrangementet');
      } catch (err) {
        addToast('Noe gikk galt under påmeldelse av arrangement', { type: 'error' });
      }
    }
  };
  const toggleModal = () => setShowModal(!showModal);
  const modal = <CaptchaModal showModal={showModal} toggleModal={toggleModal} setRecaptcha={signUp} />;

  return (
    <>
      <Button color="success" onClick={toggleModal} className={style.button}>
        Meld meg på
      </Button>
      {modal}
    </>
  );
};

export default AttendButton;
