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
import { attendeeSelectors, fetchAttendeeByEventId, patchAttendee } from 'events/slices/attendees';
import EventPaymentBlock from '../EventPayment/EventPaymentBlock';
import EventPrice from '../EventPayment/EventPrice';
import { Select } from '@dotkomonline/design-system';
import { IExtra } from '../../models/Extras';
import PublicAttendeesWrapper from './PublicAttendeesModal/PublicAttendeesWrapper';
import ParticipantsButton from './PublicAttendeesModal/ParticipantsButton';
import { changeUserExtra } from 'events/api/attendee';

interface IProps {
  eventId: number;
  eventTitle: string;
}

const AttendanceEvent: FC<IProps> = ({ eventId, eventTitle }) => {
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
  const showPayment = !attendanceEvent.is_on_waitlist && attendanceEvent.is_attendee && attendanceEvent.payment;

  return (
    <div className={style.blockGrid}>
      <Block title="Påmeldingsstart" className={style.attendanceInformation}>
        <EventCountDown endTime={registrationStart} />
      </Block>

      <Block title="Påmeldingsslutt" className={style.attendanceInformation}>
        <EventCountDown endTime={registrationEnd} />
      </Block>

      <Block title="Avmeldingsfrist" className={style.attendanceInformation}>
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
      {attendanceEvent.has_extras && attendanceEvent.is_attendee && (
        <Block title="Ekstras">
          <Select>
            <option
              key={-1}
              value={-1}
              onClick={(e: React.MouseEvent<HTMLOptionElement, MouseEvent>) =>
                dispatch(patchAttendee({ attendeeId: attendee!.id, extras: Number(e.currentTarget.value) }))
              }
            >
              Velg ekstra
            </option>
            {attendanceEvent.extras.map((extra: IExtra) => (
              <option
                key={extra.id}
                value={extra.id}
                selected={extra.id == attendee!.extras}
                onClick={(e: React.MouseEvent<HTMLOptionElement, MouseEvent>) =>
                  dispatch(patchAttendee({ attendeeId: attendee!.id, extras: Number(e.currentTarget.value) }))
                } // we know attendee exists because _isAttendee
              >
                {extra.id == attendee!.extras && 'Valgt ekstra:'} {extra.choice}
              </option>
            ))}
          </Select>
        </Block>
      )}
      <div className={`${style.attendanceContainer} ${style.fullBlock}`}>
        <Attendance canAttend={isEligibleForSignup} event={attendanceEvent} unattendDeadline={cancellationDeadline} />
        <PublicAttendeesWrapper isAttending={attendanceEvent.is_attendee} canAttend={isEligibleForSignup}>
          <ParticipantsButton eventTitle={eventTitle} eventId={eventId} />
        </PublicAttendeesWrapper>
      </div>
      {attendanceEvent.payment && (
        <Block title="Pris" className={`${style.fullBlock} ${style.priceBlock}`}>
          <EventPrice eventId={eventId} />
        </Block>
      )}
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
