import React from 'react';
import EventImage from '../components/EventImage';
import IImage from 'common/models/Image';

export interface IEventProps {
  eventUrl: string;
  images: IImage[];
  ingress: string;
  startDate: string;
  title: string;
}

const Event = ({ eventUrl, images, ingress, startDate, title }: IEventProps) => (
  <div>
    <div className="col-sm-8 col-md-4">
      <div className="hero-title">
        <a href={eventUrl}>
          <p>{ title }</p>
        </a>
      </div>
      <div className="hero-ingress hidden-xs">
        <p>{ ingress }</p>
      </div>
    </div>
    <EventImage
      date={startDate}
      images={images}
      eventUrl={eventUrl}
    />
  </div>
);

export default Event;
