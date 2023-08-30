import React, { FC } from 'react';

import { getEventColor, IEvent } from 'events/models/Event';

import AttendanceEvent from './AttendanceEvent';
import CardHeader from './Card/CardHeader';
import styles from './detail.less';
import ExportDropdown from './ExportDropdown';

interface IProps {
  event: IEvent;
}

const Registration: FC<IProps> = ({ event }) => {
  const color = getEventColor(event.event_type);
  return (
    <div className={styles.registration}>
      <CardHeader className={styles.detailHeader} color={color}>
        Påmelding
      </CardHeader>
      <ExportDropdown event={event} />
      <AttendanceEvent eventId={event.id} eventTitle={event.title} />
    </div>
  );
};

export default Registration;
