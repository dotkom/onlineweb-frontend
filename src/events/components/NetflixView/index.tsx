import { DateTime } from 'luxon';
import React, { useEffect, FC, createContext, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { eventSelectors, fetchImageEvents } from 'events/slices/events';

import SlideShow from './SlideShow';
import style from './netflixView.less';
import BigAssHero from './BigAssHero';
import { IEvent } from 'events/models/Event';

type HoveredEventContextType = {
  hoveredEvent: IEvent | undefined;
  setHoveredEvent: any; 
}

const HoveredEventContextDefaultValue : HoveredEventContextType = {
  hoveredEvent: undefined,
  setHoveredEvent: () => undefined
}

export const HoveredEventContext = createContext(HoveredEventContextDefaultValue)

export const ImageView: FC = () => {
  const dispatch = useDispatch();
  const eventIds = useSelector(selectFrontPageEventIds(), shallowEqual);
  const firstEvent = useSelector((state) => eventSelectors.selectById(state, eventIds[0]));
  const [hoveredEvent, setHoveredEvent] = useState(firstEvent)

  /** Fetch events to store on mount */
  useEffect(() => {
    dispatch(fetchImageEvents());
  }, []);

  return (
    <HoveredEventContext.Provider value={{ hoveredEvent, setHoveredEvent }}>
      <div className={style.eventGrid}>
        <BigAssHero />
        <SlideShow eventIds={eventIds} />
      </div>
    </HoveredEventContext.Provider>
  );
};

const selectFrontPageEventIds = () => (state: State) => {
  const now = DateTime.local();
  return eventSelectors
    .selectAll(state)
    .filter((event) => DateTime.fromISO(event.start_date) >= now)
    .sort((eventA, eventB) => eventA.start_date.localeCompare(eventB.start_date))
    .map((event) => event.id);
};

export default ImageView;
