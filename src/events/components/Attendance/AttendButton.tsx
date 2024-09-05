import React, { FC, useState } from 'react';
import CaptchaModal from './CaptchaModal';
import { useDispatch } from 'core/redux/hooks';
import { setAttendeeByEventId } from 'events/slices/attendees';
import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { unwrapResult } from '@reduxjs/toolkit';
import style from './attendance.less';
import { ConfirmModal } from '../../../common/components/Modal';
import * as Sentry from '@sentry/browser';
import { getUser } from '../../../authentication/api';

interface IAttendButtonProps {
  eventId: number;
  isEventFull: boolean;
  cannotUnattend?: boolean;
}

const FAILED_CAPTCHA_ERROR_TEXT = (
  <>
    Kunne ikke verifisere at du ikke er en bot.
    <br />
    <br />
    Dette kan du prøve:
    <ul>
      <li>Last inn siden på nytt og prøv igjen.</li>
      <li>Prøv en annen nettleser. Vi vet at det har vært problemer med Firefox.</li>
      <li>Hvis du fortsatt får feil, så send en e-post til dotkom@online.ntnu.no så vi melder deg på manuelt.</li>
    </ul>
  </>
);
const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const dispatch = useDispatch();
  const { eventId, isEventFull } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [addToast] = useToast({ type: 'success', duration: 5000 });

  const signUp = async (token: string | null) => {
    if (token) {
      const action = await dispatch(setAttendeeByEventId({ eventId, captcha: token }));
      try {
        unwrapResult(action);
        addToast('Du har blitt meldt på arrangementet');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ukjent feil';
        addToast(`Noe gikk galt under påmeldelse av arrangement, ERROR: ${errorMessage}`, { type: 'error' });
      }
    }
  };
  const toggleModal = () => setShowModal(!showModal);
  const modal = (
    <CaptchaModal
      showModal={showModal}
      toggleModal={toggleModal}
      setCaptcha={signUp}
      errorText={FAILED_CAPTCHA_ERROR_TEXT}
      onError={async (error) => {
        const user = await getUser();
        Sentry.captureEvent({
          message: 'User failed turnstile challenge when signing up for event.',
          level: Sentry.Severity.Warning,
          extra: {
            error: error,
          },
          user: {
            id: user?.profile.sub,
          },
        });
      }}
    />
  );
  const onConfirmModalClose = (retValue: boolean) => {
    setShowConfirmModal(false);

    if (retValue) {
      toggleModal();
    }
  };

  return (
    <>
      <ConfirmModal
        message="Avmeldingsfristen er utløpt så du vil ikke kunne melde deg av igjen."
        title="Bekreft påmelding"
        open={showConfirmModal}
        onClose={onConfirmModalClose}
      ></ConfirmModal>
      <Button
        color={isEventFull ? 'secondary' : 'success'}
        onClick={() => {
          if (props.cannotUnattend) {
            setShowConfirmModal(true);
          } else {
            toggleModal();
          }
        }}
        className={style.button}
      >
        Meld meg på {isEventFull ? 'venteliste' : null}
      </Button>
      {modal}
    </>
  );
};

export default AttendButton;
