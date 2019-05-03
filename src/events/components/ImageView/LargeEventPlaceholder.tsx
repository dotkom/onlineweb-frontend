import React from 'react';

import { getEventColor, getEventType } from 'events/models/Event';

import { DefaultEventImage } from '../DefaultEventImage';
import style from './image.less';

interface IProps {
  event_type: number;
}

const LargeEventPlaceholder = ({ event_type }: IProps) => {
  const eventTypeName = getEventType(event_type);
  return (
    <>
      <div className={style.large}>
        <h2 className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>
          {eventTypeName}
        </h2>
        <DefaultEventImage color={getEventColor(event_type)} />
        <div className={style.largeContentEmpty}>
          <p>Vi er tom for arrangementer av typen {eventTypeName}</p>
        </div>
      </div>
    </>
  );
};

export default LargeEventPlaceholder;
