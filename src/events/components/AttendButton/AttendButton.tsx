import React, { FC, useState } from 'react';
import Button from 'core/components/errors/NotAuthenticated/Button';
import CaptchaModal from './CaptchaModal';
import { DateTime } from 'luxon';
import { ISignupEligibility } from 'events/models/Event';
import { useDispatch } from 'core/redux/hooks';
import { setAttendeeByEventId } from 'events/slices/attendees';

interface IAttendButtonProps {
  canAttend: ISignupEligibility | null;
  eventId: number;
  isAttendee: boolean;
  isOnWaitList: boolean;
  waitListNumber: number;
  registrationStart: DateTime;
  registrationEnd: DateTime;
  unattendDeadline: DateTime;
}

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const dispatch = useDispatch();
  const { canAttend, eventId, unattendDeadline, isAttendee, isOnWaitList, waitListNumber } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentTime = DateTime.local(); // Check if this works

  const signUp = (token: string | null) => {
    if (token) {
      dispatch(setAttendeeByEventId({ eventId, captcha: token }));
    }
  };
  const toggleModal = () => setShowModal(!showModal);
  const signOff = () => null; //TODO add do api call

  const modal = <CaptchaModal showModal={showModal} toggleModal={toggleModal} setRecaptcha={signUp} />;

  if (!canAttend) return <p>Du må være logget inn for å se din status.</p>;
  if (currentTime < unattendDeadline && isAttendee)
    return (
      // can unattend
      <Button onClick={signOff}>Meld meg av</Button>
    );
  if (isOnWaitList) {
    return (
      <div>
        <p>{`Du er nummer ${waitListNumber} på venteliste.`}</p>
        <Button onClick={signOff}>Meld meg av venteliste</Button>
      </div>
    );
  }
  if (!canAttend.status && isAttendee) return <p>{`${canAttend.message} Avmeldingsfristen har utløpt.`}</p>;
  if (!canAttend.status) return <p>{canAttend.message}</p>; // cant attend, no buttons
  if (canAttend.status)
    return (
      <div>
        <Button onClick={toggleModal}>Meld meg på</Button>
        {modal}
      </div>
    );
  return null;
};

export default AttendButton;
