import React from 'react';

import { IEventColumn } from 'events/models/Event';

import style from './image.less';
import LargeEvent from './LargeEvent';
import LargeEventPlaceholder from './LargeEventPlaceholder';
import SmallEventColumn from './SmallEvent';

const EventColumn = ({ events, event_type }: IEventColumn) => {
  return (
    <div className={style.eventColumn}>
      {events[0] ? (
        <>
          <LargeEvent {...events[0]} />
          <SmallEventColumn events={events.slice(1, 4)} />
        </>
      ) : (
        <LargeEventPlaceholder event_type={event_type} />
      )}
    </div>
  );
};

export default EventColumn;
