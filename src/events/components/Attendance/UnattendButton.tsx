import React, { FC, useState } from 'react';
import { useDispatch } from 'core/redux/hooks';
import { removeAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { unwrapResult } from '@reduxjs/toolkit';
import style from './attendance.less';
import { ConfirmModal } from 'common/components/Modal';

interface IAttendButtonProps {
  eventId: number;
  isOnWaitList: boolean;
  waitListNumber: number;
}

const UnattendButton: FC<IAttendButtonProps> = ({ eventId, isOnWaitList, waitListNumber }) => {
  const dispatch = useDispatch();
  const [addToast] = useToast({ type: 'success', duration: 5000 });
  const [showModal, setShowModal] = useState(false);

  const signOff = async () => {
    const action = await dispatch(removeAttendeeByEventId(eventId));
    try {
      unwrapResult(action);
      addToast('Du har blitt meldt av arrangementet');
    } catch (err) {
      addToast(`Noe gikk galt under avmeldelse, ERROR: ${err.message}`, { type: 'error' });
    }
  };

  const onButtonClick = () => {
    setShowModal(true);
  };

  const onModalClose = (retValue: boolean) => {
    setShowModal(false);

    if (retValue) {
      signOff();
    }
  };

  return (
    <>
      <ConfirmModal
        message="Er du sikker på at du ønsker å melde deg av dette arrangementet?"
        open={showModal}
        onClose={onModalClose}
      ></ConfirmModal>
      {isOnWaitList ? <p>{`Du er nummer ${waitListNumber} på venteliste.`}</p> : null}
      <Button color="danger" onClick={onButtonClick} className={style.button}>
        Meld meg av
      </Button>
    </>
  );
};

export default UnattendButton;
