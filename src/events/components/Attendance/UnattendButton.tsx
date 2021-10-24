import React, { FC, useState } from 'react';
import { Button } from '@dotkomonline/design-system';
import style from './attendance.less';
import SignOffModal from './SignOffModal';

interface IAttendButtonProps {
  eventId: number;
  isOnWaitList: boolean;
  waitListNumber: number;
}

const UnattendButton: FC<IAttendButtonProps> = ({ eventId, isOnWaitList, waitListNumber }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => setShowModal(!showModal);
  const modal = (
    <SignOffModal
      showModal={showModal}
      text={'Er du sikker på av du vil melde deg av?'}
      toggleModal={toggleModal}
      eventId={eventId}
    />
  );

  return (
    <>
      {isOnWaitList ? <p>{`Du er nummer ${waitListNumber} på venteliste.`}</p> : null}
      <Button color="danger" onClick={toggleModal} className={style.button}>
        Meld meg av
      </Button>
      {modal}
    </>
  );
};

export default UnattendButton;
