import React, { FC, useContext } from 'react';

import { useSelector } from 'core/redux/hooks';
import { getEventColor, IEvent } from 'events/models/Event';

import EventImage from '../EventImage';
import style from './netflixView.less';
import { eventSelectors } from 'events/slices/events';
import { HoveredEventContext } from '.';


const BigAssHero: FC<IProps> = () => {
  const { hoveredEventId } = useContext(HoveredEventContext)
  const event = useSelector((state) => eventSelectors.selectById(state, hoveredEventId) as IEvent);
  if (event) {
    const { images, event_type, event_type_display, title, start_date, id } = event;
    return (
      <div className={style.hero}>
        <div style={{ backgroundColor: getEventColor(event_type), height: "100%" }}>
          <p>{title}</p>
        </div>
      </div>
    );
  }
  return <></>
};

export default BigAssHero;
