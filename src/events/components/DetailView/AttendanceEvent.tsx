import { DateTime } from 'luxon';
import React, { ReactChild } from 'react';
import { IAttendanceEvent } from '../../models/Event';
import Block from './Block';
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

  const sortedBundles = event.rule_bundles.sort((ba, bb) => {
    if (ba.description) {
      if (bb.description) {
        return ba.description.localeCompare(bb.description);
      } else {
        return ba.description.localeCompare(bb.rule_strings[0]);
      }
    } else if (bb.description) {
      return ba.rule_strings[0].localeCompare(bb.description);
    }
    return ba.rule_strings[0].localeCompare(bb.rule_strings[0]);
  });

  return (
    <Block title="Åpent for" className={styles.fullBlock}>
      <div className={styles.ruleBoxes}>
        {event.guest_attendance ? (
          <RuleBundleBox>Alle</RuleBundleBox>
        ) : bundlesEnabled ? (
          sortedBundles.map((bundle) =>
            bundle.rule_strings.map((rule_string) => <RuleBundleBox key={bundle.id}>{rule_string}</RuleBundleBox>)
          )
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
