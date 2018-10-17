import React from 'react';
import { DateTime } from 'luxon';
import { INewEvent, getEventColor } from '../../models/Event';
import { DOMAIN } from 'common/constants/endpoints';
import style from './detail.less';
import CardHeader from './Card/CardHeader';

const PictureCard = ({ image, event_start, event_end, location, company_event, event_type }: INewEvent) => {
  const eventImage = company_event[0] ? company_event[0].company.image : image;
  const imageUrl = eventImage ? eventImage.wide : '';
  const color = getEventColor(event_type);

  const startDate = DateTime.fromISO(event_start).toFormat('d MMM');
  const startTime = DateTime.fromISO(event_start).toFormat('hh:mm');
  const endDate = DateTime.fromISO(event_end).toFormat('d MMM');
  const endTime = DateTime.fromISO(event_end).toFormat('hh:mm');
  return (
    <div className={style.pictureCard}>
      <img src={DOMAIN + imageUrl} style={{ width: '100%' }} />
      <div>
        <CardHeader color={color}>Oppmøte</CardHeader>
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
  );
};

export default PictureCard;
