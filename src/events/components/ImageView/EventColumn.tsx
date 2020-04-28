import React, { FC } from 'react';

import { EventTypeEnum } from '../../models/Event';
import style from './image.less';
import LargeEvent from './LargeEvent';
import LargeEventPlaceholder from './LargeEventPlaceholder';
import SmallEvent from './SmallEvent';

interface IProps {
  eventIds: number[];
  eventType: EventTypeEnum;
}

const EventColumn: FC<IProps> = ({ eventIds, eventType }: IProps) => {
  return (
    <div className={style.eventColumn}>
      {eventIds[0] ? (
        <>
          <LargeEvent eventId={eventIds[0]} />
          {eventIds.slice(1, 4).map((eventId) => (
            <SmallEvent key={eventId} eventId={eventId} />
          ))}
        </>
      ) : (
        <LargeEventPlaceholder eventType={eventType} />
      )}
    </div>
  );
};

export default EventColumn;
