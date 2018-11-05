import React from 'react';
import { INewEvent, getEventColor } from '../../models/Event';
import styles from './detail.less';
import CardHeader from './Card/CardHeader';
import AttendanceEvent from './AttendanceEvent';

const Registration = ({ event_type, attendance_event }: INewEvent) => {
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
