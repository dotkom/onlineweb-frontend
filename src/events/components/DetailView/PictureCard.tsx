import React from 'react';
import { DateTime } from 'luxon';
import { INewEvent } from '../../models/Event';
import { DOMAIN } from 'common/constants/endpoints';

const PictureCard = ({ image, event_start, event_end, location, company_event }: INewEvent) => {
  const eventImage = company_event[0] ? company_event[0].company.image : image;
  const imageUrl = eventImage ? eventImage.wide : '';

  const startDate = DateTime.fromISO(event_start).toFormat('d MMM');
  const startTime = DateTime.fromISO(event_start).toFormat('hh:mm');
  const endDate = DateTime.fromISO(event_end).toFormat('d MMM');
  const endTime = DateTime.fromISO(event_end).toFormat('hh:mm');
  return (
    <div style={{ display: 'grid', background: 'white', gridTemplateColumns: '50fr 33fr' }}>
      <img src={DOMAIN + imageUrl} style={{ width: '100%' }} />
      <div>
        <p>Oppmøte</p>
        <div>
          <p>Starttid</p>
          <p>{ startDate }</p>
          <p>{ startTime }</p>
        </div>
        <div>
          <p>Sluttid</p>
          <p>{ endDate }</p>
          <p>{ endTime }</p>
        </div>
        <div>
          <p>Sted</p>
          <p>{ location }</p>
        </div>
      </div>
    </div>
  )
}

export default PictureCard;
