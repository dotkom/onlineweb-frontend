import React, { FC, useState } from 'react';
import CaptchaModal from './CaptchaModal';
import { useDispatch } from 'core/redux/hooks';
import { setAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { unwrapResult } from '@reduxjs/toolkit';
import style from './attendance.less';
import { useCalendarNotification } from '../DetailView/NewFunctionalityNotification';

interface IAttendButtonProps {
  eventId: number;
  isEventFull: boolean;
}

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const dispatch = useDispatch();
  const { eventId, isEventFull } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addToast] = useToast({ type: 'success', duration: 5000 });
  const { openNotification } = useCalendarNotification();

  const signUp = async (token: string | null) => {
    if (token) {
      const action = await dispatch(setAttendeeByEventId({ eventId, captcha: token }));
      try {
        unwrapResult(action);
        addToast('Du har blitt meldt på arrangementet');
        openNotification({ oncePersistant: true });
      } catch (err) {
        addToast(`Noe gikk galt under påmeldelse av arrangement, ERROR: ${err.message}`, { type: 'error' });
      }
    }
  };
  const toggleModal = () => setShowModal(!showModal);
  const modal = <CaptchaModal showModal={showModal} toggleModal={toggleModal} setRecaptcha={signUp} />;

  return (
    <>
      <Button color={isEventFull ? 'secondary' : 'success'} onClick={toggleModal} className={style.button}>
        Meld meg på {isEventFull ? 'venteliste' : null}
      </Button>
      {modal}
    </>
  );
};

export default AttendButton;
