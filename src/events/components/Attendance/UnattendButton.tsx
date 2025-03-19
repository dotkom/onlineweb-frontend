import React, { FC, useState } from 'react';
import { useDispatch } from 'core/redux/hooks';
import { removeAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { unwrapResult } from '@reduxjs/toolkit';
import style from './attendance.less';

interface IAttendButtonProps {
  eventId: number;
  isOnWaitList: boolean;
  waitListNumber: number;
}

const UnattendanceCauses = {
  sick: 'Sykdom',
  economic: 'Økonomiske årsaker',
  time: 'Tidsklemma',
  no_familiar_faces: 'Kjenner ingen som skal',
  other: 'Andre årsaker (spesifiser under)',
};

const UnattendButton: FC<IAttendButtonProps> = ({ eventId, isOnWaitList, waitListNumber }) => {
  const dispatch = useDispatch();
  const [addToast] = useToast({ type: 'success', duration: 5000 });
  const [showModal, setShowModal] = useState(false);

  const onButtonClick = () => {
    setShowModal(true);
  };

  const handleDeregisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const action = await dispatch(removeAttendeeByEventId({ eventId: eventId, data: data }));
    try {
      unwrapResult(action);
      addToast('Du har blitt meldt av arrangementet');
    } catch (err) {
      addToast(`Noe gikk galt under avmeldelse, ERROR: ${err.message}`, { type: 'error' });
    }
  };

  return (
    <>
      <dialog open={showModal}>
        <form method="dialog" onSubmit={handleDeregisterSubmit} className={style.deregisterModal}>
          <h1 className={style.title}>Hvorfor vil du melde deg av?</h1>
          <p className={style.message}>
            Vi i Online vil gjerne vite hvorfor du melder deg av dette arrangementet. Gjerne utdyp i fritekst slik at vi
            kan lage enda bedre arrangementer for deg i fremtiden!
          </p>

          <fieldset>
            <legend>Velg en grunn</legend>
            {Object.entries(UnattendanceCauses).map(([key, value]) => (
              <label key={key}>
                <input type="radio" name="cause" value={key} required={true} />
                {value}
              </label>
            ))}
          </fieldset>

          <label>
            Fritekst
            <textarea name="text" id="deregisterFeedbackText" />
          </label>
          <div>
            <Button type="button" onClick={() => setShowModal(false)}>
              Avbryt
            </Button>
            <Button type="submit" variant="outline">
              Meld av
            </Button>
          </div>
        </form>
      </dialog>
      {isOnWaitList ? <p>{`Du er nummer ${waitListNumber} på venteliste.`}</p> : null}
      <Button color="danger" onClick={onButtonClick} className={style.button}>
        Meld meg av
      </Button>
    </>
  );
};

export default UnattendButton;
