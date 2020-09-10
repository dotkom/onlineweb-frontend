import { FC, useState, useEffect } from "react";
import Button from "core/components/errors/NotAuthenticated/Button";
import CaptchaModal from "./CaptchaModal";
import { DateTime } from "luxon";
import { getAttendeeForEvent, userAttendEvent } from "events/api/attendee";

interface IAttendButtonProps {
  eventId: number
  registrationStart: DateTime;
  registrationEnd: DateTime;
  unattendDeadline: DateTime;
}

const AttendButton: FC<IAttendButtonProps> = (props: IAttendButtonProps) => {
  const {
    eventId,
    registrationEnd,
    registrationStart,
    unattendDeadline,
   } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
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
    if (token) {
      setAttending(true); 
      userAttendEvent(eventId, token);
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
  if (currentTime > unattendDeadline || !attending) return <p>cant unattend</p>; // cant unattend
  return null;

}

export default AttendButton;
