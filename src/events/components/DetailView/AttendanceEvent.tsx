import { DateTime } from 'luxon';
import React, { FC, useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { shallowEqual } from 'react-redux';

import { RECAPTCHA_KEY } from 'common/constants/google';
import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { ISignupEligibility } from 'events/models/Event';
import { attendanceEventSelectors } from 'events/slices/attendanceEvents';

import Block from './Block';
import style from './detail.less';
import { EventCountDown } from './EventCountDown';
import { RuleBundles } from './RuleBundles';

import { Select } from '@dotkomonline/design-system';
import { getExtraInformation } from 'events/api/events';
import { IExtra } from 'events/models/Extras';

interface IProps {
  eventId: number;
}

const AttendanceEvent: FC<IProps> = ({ eventId }) => {
  // TODO: Remove these lint disables when using captcha response.
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recaptcha, setRecaptcha] = useState<string | null>();
  const attendanceEvent = useSelector((state) => attendanceEventSelectors.selectById(state, eventId));
  // TODO: use for displaying to the user during signup
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isEligibleForSignup = useSelector(selectIsEligibleForSignup(eventId), shallowEqual);

  if (!attendanceEvent) {
    return <p className={style.attendanceMessage}>Dette er ikke et påmeldingsarrangement.</p>;
  }

  const registrationStart = DateTime.fromISO(attendanceEvent.registration_start);
  const registrationEnd = DateTime.fromISO(attendanceEvent.registration_end);
  const cancellationDeadline = DateTime.fromISO(attendanceEvent.unattend_deadline);

  const [extras, setExtras] = useState<IExtra[]>([]);

  useEffect(() => {
    if (attendanceEvent.has_extras) {
      attendanceEvent.extras.forEach((extraID) => {
        getExtraInformation(extraID).then((res) => setExtras((prevExtras) => [...prevExtras, res]));
      });
    }
  }, []);

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
      <Block title="Extras">
        {attendanceEvent.has_extras ? (
          <Select>
            {extras.map((extra) => (
              <option key={extra.id}>{extra.choice}</option>
            ))}
          </Select>
        ) : null}
        {RECAPTCHA_KEY ? <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={(value) => setRecaptcha(value)} /> : null}
      </Block>
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
