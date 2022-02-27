import { DateTime } from 'luxon';
import React, { useEffect, FC } from 'react';
import { shallowEqual } from 'react-redux';

import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { EventTypeEnum } from 'events/models/Event';
import { eventSelectors, fetchImageEvents } from 'events/slices/events';

import EventColumn from './EventColumn';
import style from './image.less';

const LEFT = [EventTypeEnum.BEDPRES];
const MIDDLE = [EventTypeEnum.KURS];
const RIGHT = [
  EventTypeEnum.ANNET,
  EventTypeEnum.EKSKURSJON,
  EventTypeEnum.INTERNT,
  EventTypeEnum.SOSIALT,
  EventTypeEnum.UTFLUKT,
  EventTypeEnum.KJELLEREN,
];

export const ImageView: FC = () => {
  const dispatch = useDispatch();
  const leftEventIds = useSelector(selectFrontPageEventIdsOfTypes(LEFT), shallowEqual);
  const middleEventIds = useSelector(selectFrontPageEventIdsOfTypes(MIDDLE), shallowEqual);
  const rightEventIds = useSelector(selectFrontPageEventIdsOfTypes(RIGHT), shallowEqual);

  /** Fetch events to store on mount */
  useEffect(() => {
    dispatch(fetchImageEvents());
  }, []);

  return (
    <>
      <div className={style.eventGrid}>
        <EventColumn eventIds={leftEventIds} eventType={EventTypeEnum.BEDPRES} />
        <EventColumn eventIds={middleEventIds} eventType={EventTypeEnum.KURS} />
        <EventColumn eventIds={rightEventIds} eventType={EventTypeEnum.SOSIALT} />
      </div>
    </>
  );
};

const selectFrontPageEventIdsOfTypes = (eventTypes: EventTypeEnum[]) => (state: State) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return eventSelectors
    .selectAll(state)
    .filter((event) => eventTypes.some((eventType) => event.event_type === eventType))
    .filter((event) => new Date(event.start_date) >= now)
    .sort((eventA, eventB) => eventA.start_date.localeCompare(eventB.start_date))
    .slice(0, 4)
    .map((event) => event.id);
};

export default ImageView;
