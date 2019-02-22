import { DateTime } from 'luxon';
import React, { useContext, useEffect, useMemo } from 'react';

import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { getImageEvents } from 'events/api/imageEvents';
import { EventTypeEnum, IEventViewProps, INewEvent } from 'events/models/Event';
import { EventsRepo } from 'events/providers/EventsRepo';

import style from './image.less';
import LargeEvent from './LargeEvent';
import LargeEventPlaceholder from './LargeEventPlaceholder';
import SmallEventColumn from './SmallEvent';

export type IProps = IEventViewProps;

const filterEventTypes = (events: INewEvent[], types: EventTypeEnum[]) => {
  return events
    .filter((event) => types.includes(event.event_type))
    .filter((event) => {
      return DateTime.fromISO(event.event_start) >= DateTime.local();
    });
};

const LEFT = [EventTypeEnum.BEDPRES];
const MIDDLE = [EventTypeEnum.KURS];
const RIGHT = [
  EventTypeEnum.ANNET,
  EventTypeEnum.EKSKURSJON,
  EventTypeEnum.INTERNT,
  EventTypeEnum.SOSIALT,
  EventTypeEnum.UTFLUKT,
];

export interface IState {
  eventsLeft: INewEvent[];
  eventsMiddle: INewEvent[];
  eventsRight: INewEvent[];
}

const INITIAL_STATE: IState = {
  eventsLeft: [],
  eventsMiddle: [],
  eventsRight: [],
};

const isPopulated = (imageEvents: IState) => {
  return !!imageEvents.eventsLeft.length || !!imageEvents.eventsMiddle.length || !!imageEvents.eventsRight.length;
};

export const ImageView = ({  }: IProps) => {
  const { eventList, updateEventList } = useContext(EventsRepo);

  const prefetch = usePrefetch(PrefetchKey.EVENTS_IMAGE, async () => {
    const [left, middle, right] = await getImageEvents();
    return {
      eventsLeft: left || [],
      eventsMiddle: middle || [],
      eventsRight: right || [],
    };
  });

  /** Fetch events to repo on mount */
  useEffect(() => {
    (async () => {
      const events = await getImageEvents();
      updateEventList(events.flat());
    })();
  }, []);

  const imageEvents = useMemo(
    () => ({
      eventsLeft: filterEventTypes(eventList, LEFT),
      eventsMiddle: filterEventTypes(eventList, MIDDLE),
      eventsRight: filterEventTypes(eventList, RIGHT),
    }),
    [eventList]
  );

  const displayEvents = !isPopulated(imageEvents) ? prefetch || INITIAL_STATE : imageEvents;

  return (
    <>
      <div className={style.largeEventGrid}>
        {displayEvents.eventsLeft[0] ? (
          <LargeEvent {...displayEvents.eventsLeft[0]} />
        ) : (
          <LargeEventPlaceholder event_type={2} />
        )}
        {displayEvents.eventsMiddle[0] ? (
          <LargeEvent {...displayEvents.eventsMiddle[0]} />
        ) : (
          <LargeEventPlaceholder event_type={3} />
        )}
        {displayEvents.eventsRight[0] ? (
          <LargeEvent {...displayEvents.eventsRight[0]} />
        ) : (
          <LargeEventPlaceholder event_type={1} />
        )}
      </div>
      <div className={style.smallEventGrid}>
        <SmallEventColumn events={displayEvents.eventsLeft.slice(1, 4)} />
        <SmallEventColumn events={displayEvents.eventsMiddle.slice(1, 4)} />
        <SmallEventColumn events={displayEvents.eventsRight.slice(1, 4)} />
      </div>
    </>
  );
};

export default ImageView;
