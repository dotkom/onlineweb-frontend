import { DateTime } from 'luxon';
import React, { FC, useEffect } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';

import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { ISignupEligibility } from 'events/models/Event';
import { attendanceEventSelectors } from 'events/slices/attendanceEvents';

import Block from './Block';
import style from './detail.less';
import { EventCountDown } from './EventCountDown';
import { RuleBundles } from './RuleBundles';
import Attendance from '../Attendance';
import { attendeeSelectors, fetchAttendeeByEventId } from 'events/slices/attendees';
import EventPaymentBlock from './EventPaymentBlock';

interface IProps {
  eventId: number;
}

const AttendanceEvent: FC<IProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const attendanceEvent = useSelector((state) => attendanceEventSelectors.selectById(state, eventId));
  const attendee = useSelector((state) => attendeeSelectors.selectAll(state)).find(
    (attendee) => attendee.event === eventId
  );

  useEffect(() => {
    dispatch(fetchAttendeeByEventId(eventId));
  }, [eventId]);

  const isEligibleForSignup = useSelector(selectIsEligibleForSignup(eventId), shallowEqual);

  if (!attendanceEvent) {
    return <p className={style.attendanceMessage}>Dette er ikke et påmeldingsarrangement.</p>;
  }

  const registrationStart = DateTime.fromISO(attendanceEvent.registration_start);
  const registrationEnd = DateTime.fromISO(attendanceEvent.registration_end);
  const cancellationDeadline = DateTime.fromISO(attendanceEvent.unattend_deadline);
  const showPayment = !attendanceEvent.is_on_waitlist && attendanceEvent.is_attendee && attendanceEvent.payment != null;

  return (
    <div className={style.blockGrid}>
      <Block title="Påmeldingsstart">
        <EventCountDown endTime={registrationStart} />
      </Block>

      <Block title="Påmeldingslutt">
        <EventCountDown endTime={registrationEnd} />
      </Block>

      <Block title="Avmeldingsfrist">
        <EventCountDown endTime={cancellationDeadline} />
      </Block>

      <RuleBundles bundleIds={attendanceEvent.rule_bundles} guestAttendance={attendanceEvent.guest_attendance} />

      <Block title="Påmeldte">
        <p>
          {attendanceEvent.number_of_seats_taken}/{attendanceEvent.max_capacity}
        </p>
      </Block>

      <Block title="Venteliste">
        <p>{attendanceEvent.waitlist ? attendanceEvent.number_on_waitlist : '-'}</p>
      </Block>
      <div className={`${style.attendanceContainer} ${style.fullBlock}`}>
        <Attendance canAttend={isEligibleForSignup} event={attendanceEvent} unattendDeadline={cancellationDeadline} />
      </div>
      {showPayment && <EventPaymentBlock hasPaid={attendee?.has_paid} eventId={eventId} />}
    </div>
  );
};

const selectIsEligibleForSignup = (eventId: number) => (state: State): ISignupEligibility => {
  const attendanceEvent = attendanceEventSelectors.selectById(state, eventId);
  if (attendanceEvent) {
    return attendanceEvent.is_eligible_for_signup;
  } else {
    return {
      status: false,
      message: 'Dette er ikke et påmeldingsarrangement',
      status_code: 404,
    };
  }
};

export default AttendanceEvent;
