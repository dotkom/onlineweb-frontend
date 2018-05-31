import React, { Component } from 'react';
import { DateTime, Interval } from 'luxon';
import Events from '../components/Events';
import { setEventsForEventTypeId, toggleEventTypeDisplay } from '../utils';
import { get } from 'common/utils/api';

const mergeEventImages = (eventImage: string, companyEvent: any) => {
  const eventImages = [];
  // Event images
  if (eventImage) {
    eventImages.push(eventImage);
  }
  // Company images
  const companyImages = companyEvent.map((company: any) => (
    company.company.image
  ));
  return [...eventImages, ...companyImages];
};

export interface IEvent {
    readonly id: number
    readonly slug: string
    readonly ingress_short: string
    readonly ingress_long: string
    readonly event_start: string
    readonly event_end: string
    readonly title: string
    readonly image: string
    readonly company_event: any
    readonly startDate: string
    readonly endDate: string

}

const apiEventsToEvents = (event: IEvent) => ({
  eventUrl: `/events/${event.id}/${event.slug}`,
  ingress: event.ingress_short,
  startDate: event.event_start,
  endDate: event.event_end,
  title: event.title,
  images: mergeEventImages(event.image, event.company_event),
});

const sortEvents = (a: IEvent, b: IEvent) => {
  // checks if the event is starting today or is ongoing
  const dt1 = DateTime.fromISO(a.startDate)
  const dt2 = DateTime.fromISO(a.endDate)
  const dt3 = DateTime.fromISO(b.startDate)
  const dt4 = DateTime.fromISO(b.endDate)

  if (Interval.fromDateTimes(dt1, dt2).contains(DateTime.local())) {
    if (Interval.fromDateTimes(dt3, dt4).contains(DateTime.local())) {
      return dt2 < dt4 ? -1 : 1;
    }
    return -1;
  }
  return dt1 < dt3 ? -1 : 1;
};

/*
Reduces array to object and adds some generic fields

Example:
{
  1: {
    id: '1',
    name: 'Test',
    display: true,
    ...
  },
  ...
}
*/
const initialEventTypes = (eventTypes: any[]) => (
  eventTypes.reduce((accumulator, eventType) => (
    Object.assign(accumulator, {
      [eventType.id]: {
        id: eventType.id,
        name: eventType.name,
        display: true,
        events: [],
        loaded: false,
      },
    })
  ), {})
);

export interface IEventsContainerProps {

}

class EventsContainer extends Component<IEventsContainerProps> {
  public API_URL: string;

  constructor(props: IEventsContainerProps) {
    super(props);
    this.API_URL = `/api/v1/events/`;
    const eventTypes = [
      { id: '1', name: 'Sosialt' },
      { id: '2', name: 'Bedriftspresentasjon' },
      { id: '3', name: 'Kurs' },
      { id: 'other', name: 'Annet' },
    ];
    this.state = {
      events: [],
      dirty: false,
      eventTypes: initialEventTypes(eventTypes),
    };
    this.setEventVisibility = this.setEventVisibility.bind(this);
    this.getVisibleEvents = this.getVisibleEvents.bind(this);

    this.fetchEvents();
    // Loop over event types
    Object.keys(this.state.eventTypes).forEach((eventTypeId) => {
      const eventType = this.state.eventTypes[eventTypeId];
      this.fetchEventsByType(eventType.id);
    });
  }

  getVisibleEvents(): IEvent[] {
    const { eventTypes } = this.state;
    const allEventTypesLoaded = Object.keys(eventTypes).every(eventTypeId => (
      eventTypes[eventTypeId].loaded
    ));
    if (!allEventTypesLoaded) {
      // Show initially loaded events instead
      return this.state.events;
    }
    // Reduce all event type events to one array
    const visibleEvents = Object.keys(eventTypes).reduce((events: IEvent[], eventTypeId: number) => {
      const eventType = eventTypes[eventTypeId];
      if (eventType.display) {
        return [...events, ...eventType.events];
      }
      return events;
    }, []);

    visibleEvents.sort(sortEvents);
    return visibleEvents;
  }

  setEventVisibility(e) {
    this.setState({
      eventTypes: toggleEventTypeDisplay(this.state, e.eventType),
    });
  }

  getEventTypes() {
    const { eventTypes } = this.state;
    // Turn object into array
    return Object.keys(eventTypes).map(eventTypeId => (
      eventTypes[eventTypeId]
    ));
  }

  async fetchEvents() {
    const { results } = await get(this.API_URL, { event_end__gte: DateTime.local().toISODate(), format: 'json' });
    const events = results.map(apiEventsToEvents);
    this.setState({ events });
  }

  async fetchEventsByType(eventType) {
    let extra = eventType === 'other' ? '4,5,6,7' : eventType;
    const { results } = await get(this.API_URL, { event_end__gte: DateTime.local().toISODate(), format: 'json', event_type: extra });
    const events = results.map(apiEventsToEvents);
    this.setState({
      eventTypes: setEventsForEventTypeId(this.state, eventType, events)
    });
  }

  mainEvents(): IEvent[] {
    return this.getVisibleEvents().slice(0, 2);
  }

  smallEvents(): IEvent[] {
    return this.getVisibleEvents().slice(2, 10);
  }

  render() {
    return (
      <Events
        mainEvents={this.mainEvents()} smallEvents={this.smallEvents()}
        setEventVisibility={this.setEventVisibility}
        eventTypes={this.getEventTypes()}
      />
    );
  }
}

export default EventsContainer;
