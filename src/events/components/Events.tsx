import React from 'react';
import Event from './Event';
import SmallEvent from './SmallEvent';
import EventsHeading from './EventsHeading';
import { IFrontpageEvent, EventType } from '../models/Event'

export interface IEventsProps {
  mainEvents: IFrontpageEvent[]
  smallEvents: IFrontpageEvent[]
  setEventVisibility: Function
  eventTypes: EventType[]
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
    <div className="row clearfix hero">
      <ul className="event-list clearfix">
        {
          smallEvents.map((event: IFrontpageEvent, index: number) => (
            <SmallEvent key={index} {...event} />
          ))
        }
      </ul>
    </div>
  </div>
);

export default Events;
