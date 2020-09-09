import { FC, useState, useEffect } from "react";
import Button from "core/components/errors/NotAuthenticated/Button";
import CaptchaModal from "./CaptchaModal";
import { DateTime } from "luxon";
import { getAttendeeForEvent } from "events/api/attendee";

interface IAttendButtonProps {
  eventId: number
  registrationStart: DateTime;
  registrationEnd: DateTime;
  unattendDeadline: DateTime;
}

interface ISignUpButtonProps {
  toggleModal: () => void;
}

const signOffButton = () => {
  return (
    <div>
    </div>
  )
}

const registrationOngoing = (registrationStart: DateTime, registrationEnd: DateTime) => (
  DateTime.local() < registrationEnd && DateTime.local() > registrationStart // is fine
);

const canUnattend = (unattendDeadline: DateTime, attending: boolean) => (
  DateTime.local() < unattendDeadline && attending
)

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const {
    eventId,
    registrationEnd,
    registrationStart,
    unattendDeadline,
   } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [recaptcha, setRecaptcha] = useState<string | null>();
  const [attending, setAttending] = useState<boolean>(false); // Fetch is attending
  const currentTime = DateTime.local(); // Check if this works

  useEffect(() => {
    const fetchAttending = async () => {
      const attendingFetch = await getAttendeeForEvent(eventId);
      setAttending(attendingFetch.attended);
    }
    fetchAttending();
  }, [eventId])

  const signUp = (token: string | null) => {
    setRecaptcha(token);
    if (token) {
      setAttending(true); //TODO do api call
    }
  }
  const toggleModal = () => setShowModal(!showModal);
  const signOff = () => setAttending(false); //TODO add do api call

  const modal = <CaptchaModal showModal={showModal} toggleModal={toggleModal} setRecaptcha={signUp} />

  if (currentTime > registrationEnd || currentTime < registrationStart) return null; // cant attend, no buttons
  if (currentTime < unattendDeadline && attending) return ( // can unattend
    <Button onClick={signOff}>Meld meg av</Button>
  );
  if (currentTime > registrationStart) return (
    <div>
      <Button onClick={toggleModal}>Meld meg på</Button>
      {modal}
    </div>
  );
  if (currentTime > unattendDeadline || !attending) return 'cant unattend'; // cant unattend
  return null;

}

export default AttendButton;
