import { DateTime } from 'luxon';
import React, { useContext, useEffect, useMemo } from 'react';

import { getImageEvents } from 'events/api/imageEvents';
import { EventTypeEnum, IEvent, IEventViewProps } from 'events/models/Event';
import { EventsRepo } from 'events/providers/EventsRepo';

import EventColumn from './EventColumn';
import style from './image.less';

export type IProps = IEventViewProps;

const filterEventTypes = (events: IEvent[], types: EventTypeEnum[]) => {
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
  EventTypeEnum.KJELLEREN,
];

export interface IState {
  eventsLeft: IEvent[];
  eventsMiddle: IEvent[];
  eventsRight: IEvent[];
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

  const displayEvents = !isPopulated(imageEvents) ? INITIAL_STATE : imageEvents;

  return (
    <>
      <div className={style.eventGrid}>
        <EventColumn events={displayEvents.eventsLeft} event_type={EventTypeEnum.BEDPRES} />
        <EventColumn events={displayEvents.eventsMiddle} event_type={EventTypeEnum.KURS} />
        <EventColumn events={displayEvents.eventsRight} event_type={EventTypeEnum.SOSIALT} />
      </div>
    </>
  );
};

export default ImageView;
