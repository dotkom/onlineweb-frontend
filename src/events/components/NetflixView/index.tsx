import { DateTime } from 'luxon';
import React, { useEffect, FC } from 'react';
import { shallowEqual } from 'react-redux';

import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { eventSelectors, fetchImageEvents } from 'events/slices/events';

import SlideShow from './SlideShow';
import style from './image.less';


export const ImageView: FC = () => {
  const dispatch = useDispatch();
  const eventIds = useSelector(selectFrontPageEventIds(), shallowEqual);

  /** Fetch events to store on mount */
  useEffect(() => {
    dispatch(fetchImageEvents());
  }, []);

  return (
    <div className={style.eventGrid}>
      <SlideShow eventIds={eventIds} />
    </div>
  );
};

const selectFrontPageEventIds = () => (state: State) => {
  const now = DateTime.local();
  return eventSelectors
    .selectAll(state)
    .filter((event) => DateTime.fromISO(event.start_date) >= now)
    .sort((eventA, eventB) => eventA.start_date.localeCompare(eventB.start_date))
    .slice(0, 5)
    .map((event) => event.id);
};

export default ImageView;
