import React, { FC, useEffect, useState } from 'react';

import { md } from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import HttpError from 'core/components/errors/HttpError';

import { getAttendanceEvent } from 'events/api/events';
import { IUserAttendee } from 'events/models/Attendee';
import { IPayment } from 'events/models/Event';
import { getEventUserAttendees } from 'payments/api/paymentRelation';
import { Payment } from '../Payment';

interface IProps {
  eventId: number;
}

const ABOUT_EVENT_PAYMENT = md`
  # Arrangementsbetaling

  Velkommen til en beta-versjon av Onlines nye betalingsside! Dotkom minner om at de nye nettsidene til Online enda er under utvikling, og vi setter pris på all tilbakemelding du kan gi.
`;

export const EventPayment: FC<IProps> = ({ eventId }) => {
  const [userAttendees, setUserAttendees] = useState<IUserAttendee[]>();
  const [attendanceEvent, setAttendanceEvent] = useState();

  const loadAttendanceEvent = async () => {
    const event = await getAttendanceEvent(eventId);
    setAttendanceEvent(event);
  };

  const loadUserAttendees = async () => {
    const attendees = await getEventUserAttendees({ event: eventId });
    setUserAttendees(attendees);
  };

  useEffect(() => {
    loadAttendanceEvent();
    loadUserAttendees();
  }, []);

  if (!attendanceEvent || !userAttendees) {
    return <Spinner />;
  }

  // Map both unattending, non-priced, and 404 to a 404 error page.
  if (!attendanceEvent.is_attendee || attendanceEvent.payments.length === 0) {
    return <HttpError code={404} />;
  }

  // Users can be manually registered as having paid.
  const manuallyPaid = !!userAttendees.find((attendee) => attendee.has_paid);

  return (
    <Page>
      <Pane>{ABOUT_EVENT_PAYMENT}</Pane>
      <Payment payment={attendanceEvent.payments[0]} isPaid={manuallyPaid} />
    </Page>
  );
};
