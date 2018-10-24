import React from 'react';
import { DateTime } from 'luxon';
import { Carousel } from 'react-bootstrap';
import IImage from 'common/models/Image';

export interface IEventImageProps {
  date: string;
  eventUrl: string;
  images: IImage[];
}

const EventImage = ({ date, eventUrl, images }: IEventImageProps) => (
  <div className="col-sm-4 col-md-2">
    <Carousel controls={false} indicators={false}>
      { images.map((image, index) => (
        <Carousel.Item key={index} active={index === 0}>
          <a href={eventUrl}>
            <picture>
              <source srcSet={image.lg} media="(max-width: 768px)" />
              <source srcSet={image.md} media="(max-width: 992px)" />
              <img src={process.env.OW4_ADDRESS + image.thumb} width="100%" alt="" />
            </picture>
          </a>
        </Carousel.Item>
        ))
      }
    </Carousel>
    <span className="hero-date">{DateTime.fromISO(date).toFormat('dd. LLL')}</span>
  </div>
);

export default EventImage;
