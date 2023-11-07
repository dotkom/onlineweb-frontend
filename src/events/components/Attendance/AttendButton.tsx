import React, { FC, useState } from 'react';
import CaptchaModal from './CaptchaModal';
import { useDispatch } from 'core/redux/hooks';
import { setAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { unwrapResult } from '@reduxjs/toolkit';
import style from './attendance.less';
import { ConfirmModal } from 'common/components/Modal';

interface IAttendButtonProps {
  eventId: number;
  isEventFull: boolean;
  isAfterUnattendDeadline: boolean;
}

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const dispatch = useDispatch();
  const { eventId, isEventFull, isAfterUnattendDeadline } = props;
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [addToast] = useToast({ type: 'success', duration: 5000 });

  const signUp = async (token: string | null) => {
    if (token) {
      const action = await dispatch(setAttendeeByEventId({ eventId, captcha: token }));
      try {
        unwrapResult(action);
        addToast('Du har blitt meldt på arrangementet');
      } catch (err) {
        addToast(`Noe gikk galt under påmeldelse av arrangement, ERROR: ${err.message}`, { type: 'error' });
      }
    }
  };
  const toggleCaptchaModal = () => setShowCaptchaModal((prevState) => !prevState);
  const modal = <CaptchaModal showModal={showCaptchaModal} toggleModal={toggleCaptchaModal} setRecaptcha={signUp} />;

  const onConfirmModalClose = (retValue: boolean) => {
    setShowConfirmModal(false);

    if (retValue) {
      toggleCaptchaModal();
    }
  };

  const onButtonClick = () => {
    if (!isAfterUnattendDeadline) {
      toggleCaptchaModal();
    } else {
      setShowConfirmModal(true);
    }
  };

  return (
    <>
      <ConfirmModal
        title="Avmeldingsfrist utløpt"
        message="Er du sikker på at du vil melde deg på dette arrangementet? Du vil ikke kunne melde deg av."
        open={showConfirmModal}
        onClose={onConfirmModalClose}
      />
      <Button color={isEventFull ? 'secondary' : 'success'} onClick={onButtonClick} className={style.button}>
        Meld meg på {isEventFull ? 'venteliste' : null}
      </Button>
      {modal}
    </>
  );
};

export default AttendButton;
