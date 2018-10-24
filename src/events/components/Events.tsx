import React from 'react';
import Event from './Event';
import SmallEvent from './SmallEvent';
import EventsHeading from './EventsHeading';
import { IFrontpageEvent, EventType } from '../models/Event';
import ListView from './ListView';

export interface IEventsProps {
  mainEvents: IFrontpageEvent[];
  smallEvents: IFrontpageEvent[];
  setEventVisibility: Function; // tslint:disable-line
  eventTypes: EventType[];
}

const Events = ({ mainEvents, smallEvents, setEventVisibility, eventTypes }: IEventsProps) => (
  <div>
    <EventsHeading eventTypes={eventTypes} setEventVisibility={setEventVisibility} />
    <div className="row clearfix hero">
      {
        mainEvents.length !== 0
        ? mainEvents.map((event: IFrontpageEvent, index: number) =>
          <Event key={index} {...event} />,
        )
        : <div className="col-lg-12">Ingen arrangementer funnet.</div>
      }
    </div>
    <ListView events={smallEvents} />
  </div>
);

export default Events;
