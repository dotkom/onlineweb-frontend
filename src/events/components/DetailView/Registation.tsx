import React from 'react';
import { getEventColor, IEvent } from '../../models/Event';
import AttendanceEvent from './AttendanceEvent';
import CardHeader from './Card/CardHeader';
import styles from './detail.less';

const Registration = ({ event_type, attendance_event }: IEvent) => {
  const color = getEventColor(event_type);

  const message = <p className={styles.attendanceMessage}>Dette er ikke et påmeldingsarrangement.</p>;

  return (
    <div className={styles.registration}>
      <CardHeader className={styles.detailHeader} color={color}>
        Påmelding
      </CardHeader>
      {attendance_event ? <AttendanceEvent event={attendance_event} /> : message}
    </div>
  );
};

export default Registration;
