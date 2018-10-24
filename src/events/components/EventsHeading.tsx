import React from 'react';
// import Urls from 'urls';
import EventFilter from './EventFilter';
import { EventType } from '../models/Event';

export interface IEventsHeadingProps {
  eventTypes: EventType[];
  setEventVisibility: Function; // tslint:disable-line
}

const EventsHeading = ({ eventTypes, setEventVisibility }: IEventsHeadingProps) => (
  <div>
    <div className="page-header clearfix">
      <div className="row">
        <div className="col-md-8 col-xs-6">
          <h1 id="events-heading">Arrangementer</h1>
        </div>
        <div className="col-md-4 col-xs-6">
          <div className="archive-link">
            {/*<a href={Urls.events_index()}*/}
            <a href="/events">Arkiv
            <span className="glyphicon glyphicon-chevron-right"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12">
        <EventFilter eventTypes={eventTypes} setEventVisibility={setEventVisibility} />
      </div>
    </div>
  </div>
);

export default EventsHeading;
