import React from 'react';

import { INewEvent } from 'events/models/Event';
import { EventTypeEnum } from '../../models/Event';
import style from './image.less';
import LargeEvent from './LargeEvent';
import LargeEventPlaceholder from './LargeEventPlaceholder';
import SmallEventColumn from './SmallEvent';

export interface IProps {
  events: INewEvent[];
  event_type: EventTypeEnum;
}

const EventColumn = ({ events, event_type }: IProps) => {
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
