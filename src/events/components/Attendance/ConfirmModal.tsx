import React, { FC } from 'react';
import { Button, Modal } from '@dotkomonline/design-system';
import { unwrapResult } from '@reduxjs/toolkit';
import { removeAttendeeByEventId } from 'events/slices/attendees';
import style from './attendance.less';
import { useToast } from 'core/utils/toast/useToast';
import { useDispatch } from 'core/redux/hooks';

interface ConfirmModalProps {
  showModal: boolean;
  header?: string;
  text?: string;
  toggleModal: () => void;
  eventId: number;
}

const ConfirmModal: FC<ConfirmModalProps> = (props: ConfirmModalProps) => {
  const dispatch = useDispatch();
  const [addToast] = useToast({ type: 'success', duration: 5000 });
  const { showModal, toggleModal, header, text } = props;

  if (!showModal) return null;

  const signOff = async () => {
    const action = await dispatch(removeAttendeeByEventId(props.eventId));
    try {
      unwrapResult(action);
      addToast('Du har blitt meldt av arrangementet');
    } catch (err) {
      addToast(`Noe gikk galt under avmeldelse, ERROR: ${err.message}`, { type: 'error' });
    }
  };

  return (
    <Modal open={showModal} onClose={toggleModal}>
      <h1>{header}</h1>
      <p>{text}</p>
      <Button color="danger" onClick={signOff} className={style.button}>
        Ja, meld meg av!
      </Button>
    </Modal>
  );
};

export default ConfirmModal;
