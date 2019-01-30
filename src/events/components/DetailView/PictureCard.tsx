import { DateTime } from 'luxon';
import React from 'react';
import { getEventColor, INewEvent } from '../../models/Event';
import EventImage from '../EventImage';
import Block from './Block';
import CardHeader from './Card/CardHeader';
import style from './detail.less';

const PictureCard = ({ image, event_start, event_end, location, company_event, event_type }: INewEvent) => {
  const color = getEventColor(event_type);

  const startDate = DateTime.fromISO(event_start).toFormat('d MMM');
  const startTime = DateTime.fromISO(event_start).toFormat('HH:mm');
  const endDate = DateTime.fromISO(event_end).toFormat('d MMM');
  const endTime = DateTime.fromISO(event_end).toFormat('HH:mm');

  return (
    <div className={style.pictureCard}>
      <EventImage companyEvents={company_event} image={image} size="lg" />

      <div className={style.attendance}>
        <CardHeader className={style.detailHeader} color={color}>
          Oppmøte
        </CardHeader>

        <div className={style.blockGrid}>
          <Block title="Starttid">
            <p>{startDate}</p>
            <p>{startTime}</p>
          </Block>

          <Block title="Sluttid">
            <p>{endDate}</p>
            <p>{endTime}</p>
          </Block>

          <Block title="Sted">
            <p>{location}</p>
          </Block>
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
