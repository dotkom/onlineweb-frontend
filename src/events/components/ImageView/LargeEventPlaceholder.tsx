import React from 'react';

import { getEventColor, getEventType, EventTypeEnum } from 'events/models/Event';

import { DefaultEventImage } from '../DefaultEventImage';
import style from './image.less';

interface IProps {
  eventType: EventTypeEnum;
}

const LargeEventPlaceholder = ({ eventType }: IProps) => {
  const eventTypeName = getEventType(eventType);
  return (
    <>
      <div className={style.large}>
        <h2 className={style.imageLargeType} style={{ background: getEventColor(eventType) }}>
          {eventTypeName}
        </h2>
        <DefaultEventImage color={getEventColor(eventType)} />
        <div className={style.largeContentEmpty}>
          <p>Vi er tom for arrangementer av typen {eventTypeName}</p>
        </div>
      </div>
    </>
  );
};

export default LargeEventPlaceholder;
