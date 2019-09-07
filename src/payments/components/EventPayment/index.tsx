import { Page, Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import { getAttendanceEvent } from 'events/api/events';
import { IPayment } from 'events/models/Event';
import React, { FC, useEffect, useState } from 'react';
import { Payment } from './Payment';
import { md } from 'common/components/Markdown';

interface IProps {
  eventId: number;
}

const ABOUT_EVENT_PAYMENT = md`
  Dette er betalingssiden for arrangementer. Det skulle nok gjerne stått litt mer tekst her.
`;

export const EventPayment: FC<IProps> = ({ eventId }) => {
  const [attendanceEvent, setAttendanceEvent] = useState();

  const loadAttendanceEvent = async () => {
    const event = await getAttendanceEvent(eventId);
    setAttendanceEvent(event);
  };

  useEffect(() => {
    loadAttendanceEvent();
  }, []);

  // TODO: Handle user not registered to event.
  // TODO: Handle 404.
  // TODO: Handle not logged in.
  if (!attendanceEvent) {
    return <Spinner />;
  }

  return (
    <Page>
      <Pane>
        {ABOUT_EVENT_PAYMENT}
      </Pane>

      {attendanceEvent.payments.map((payment: IPayment) => (
        <Payment payment={payment} key={payment.id} />
      ))}
    </Page>
  );
};
