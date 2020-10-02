import React from 'react';

import { getEventColor, getEventType, EventTypeEnum } from 'events/models/Event';

import style from './image.less';
import { CompactLogo } from '@dotkomonline/design-system';

interface IProps {
  eventType: EventTypeEnum;
}

const LargeEventPlaceholder = ({ eventType }: IProps) => {
  const eventTypeName = getEventType(eventType);
  const color = getEventColor(eventType);
  return (
    <div className={style.large}>
      <h2 className={style.imageLargeType} style={{ background: color }}>
        {eventTypeName}
      </h2>
      <div className={style.logo}>
        <CompactLogo width="40%" primaryColor={color} secondaryColor={color} />
      </div>
      <div className={style.largeContentEmpty}>
        <p>Vi er tom for arrangementer av typen {eventTypeName}</p>
      </div>
    </div>
  );
};

export default LargeEventPlaceholder;
