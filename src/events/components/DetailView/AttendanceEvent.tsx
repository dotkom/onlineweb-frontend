import React, { ReactChild } from 'react';
import { IAttendanceEvent } from '../../models/Event';
import Block from './Block';
import { DateTime } from 'luxon';
import styles from './detail.less';

interface IRuleBundleBox {
  children: ReactChild | ReactChild[];
}

interface IAttendanceEventProps {
  event: IAttendanceEvent;
}

const RuleBundleBox = ({ children }: IRuleBundleBox) => <span className={styles.ruleBox}>{children}</span>;

const RuleBundles = ({ event }: IAttendanceEventProps) => {
  const bundlesEnabled = event.rule_bundles && event.rule_bundles.length;

  return (
    <Block title="Åpent for" className={styles.fullBlock}>
      <div className={styles.ruleBoxes}>
        {event.guest_attendance ? (
          <RuleBundleBox>Alle</RuleBundleBox>
        ) : bundlesEnabled ? (
          event.rule_bundles.map((bundle) => (
            <RuleBundleBox key={bundle.id}>{bundle.description || bundle.rule_strings}</RuleBundleBox>
          ))
        ) : (
          <RuleBundleBox>Alle medlemmer</RuleBundleBox>
        )}
      </div>
    </Block>
  );
};

const AttendanceEvent = ({ event }: IAttendanceEventProps) => {
  const registrationStart = DateTime.fromISO(event.registration_start).toFormat('d MMM hh:mm');
  const registrationEnd = DateTime.fromISO(event.registration_end).toFormat('d MMM hh:mm');
  const cancellationDeadline = DateTime.fromISO(event.unattend_deadline).toFormat('d MMM hh:mm');

  return (
    <div className={styles.blockGrid}>
      <Block title="Påmeldingsstart">
        <p>{registrationStart}</p>
      </Block>

      <Block title="Påmeldingslutt">
        <p>{registrationEnd}</p>
      </Block>

      <Block title="Avmeldingsfrist">
        <p>{cancellationDeadline}</p>
      </Block>

      <RuleBundles event={event} />

      <Block title="Påmeldte">
        <p>
          {event.number_of_seats_taken}/{event.max_capacity}
        </p>
      </Block>

      <Block title="Venteliste">{event.waitlist ? <p>{event.number_on_waitlist}</p> : <p>Ikke tilgjengelig</p>}</Block>
    </div>
  );
};

export default AttendanceEvent;
