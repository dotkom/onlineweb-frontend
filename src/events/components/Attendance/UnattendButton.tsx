import React, { FC, useRef } from 'react';
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
  school: 'Skolearbeid',
  no_familiar_faces: 'Kjenner ingen som skal',
  other: 'Andre årsaker (spesifiser under)',
};

const UnattendButton: FC<IAttendButtonProps> = ({ eventId, isOnWaitList, waitListNumber }) => {
  const dispatch = useDispatch();
  const [addToast] = useToast({ type: 'success', duration: 5000 });
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const onButtonClick = () => {
    dialogRef.current?.showModal();
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
      <dialog
        ref={dialogRef}
        className={style.deregisterModal}
        onClick={(e) => e.target === dialogRef?.current && dialogRef.current?.close()}
      >
        <form method="dialog" onSubmit={handleDeregisterSubmit}>
          <h1 className={style.title}>Hvorfor vil du melde deg av?</h1>
          <p className={style.message}>
            Vi vil gjerne vite hvorfor du melder deg av dette arrangementet. Gjerne utdyp slik at vi kan lage enda bedre
            arrangementer for deg i fremtiden!
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
            Utdyp årsak:
            <textarea name="text" />
          </label>
          <div>
            <Button type="button" onClick={() => dialogRef?.current?.close()}>
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
