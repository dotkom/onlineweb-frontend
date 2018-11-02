import React, { ReactChild } from 'react';
import { INewEvent, getEventColor } from '../../models/Event';
import styles from './detail.less';
import CardHeader from './Card/CardHeader';
import Block from './Block';
import { DateTime } from 'luxon';

interface IRuleBundleBox {
  children: ReactChild | ReactChild[];
}
const RuleBundleBox = ({ children }: IRuleBundleBox) => (
  <span className={styles.ruleBox}>{children}</span>
);

const Registration = ({ event_type, attendance_event }: INewEvent) => {
  const color = getEventColor(event_type);
  
  let content = (
    <p className={styles.attendanceMessage}>
      Dette er ikke et påmeldingsarrangement.
    </p>
  );

  if (attendance_event) {
    content = (
      <>
        <div className={styles.blockGrid}>
          <Block title="Påmeldingsstart">
            <p>{DateTime.fromISO(attendance_event.registration_start).toFormat('d MMM hh:mm')}</p>
          </Block>

          <Block title="Påmeldingslutt">
            <p>{DateTime.fromISO(attendance_event.registration_end).toFormat('d MMM hh:mm')}</p>
          </Block>

          <Block title="Avmeldingsfrist">
            <p>{DateTime.fromISO(attendance_event.unattend_deadline).toFormat('d MMM hh:mm')}</p>
          </Block>

          <Block title="Åpent for" className={styles.fullBlock}>
            <div className={styles.ruleBoxes}>
              {attendance_event.guest_attendance ? (
                <RuleBundleBox>Alle</RuleBundleBox>
              ) : attendance_event.rule_bundles ? attendance_event.rule_bundles.map(bundle => (
                <RuleBundleBox key={bundle.id}>{bundle.description || bundle.rule_strings}</RuleBundleBox>
              )) : (
                <RuleBundleBox>Alle medlemmer</RuleBundleBox>
              )}
            </div>
          </Block>

          <Block title="Påmeldte">
            <p>{attendance_event.number_of_seats_taken}/{attendance_event.max_capacity}</p>
          </Block>

          <Block title="Venteliste">
            {attendance_event.waitlist ? (
              <p>{attendance_event.number_on_waitlist}</p>
            ) : (
              <p>Ikke tilgjengelig</p>
            )}
          </Block>
        </div>
      </>
    );
  }

  return (
    <div className={styles.registration}>
      <div className={styles.cardMargin}>
        <CardHeader color={color}>Påmelding</CardHeader>
        {content}
      </div>
    </div>
  );
};

export default Registration;
