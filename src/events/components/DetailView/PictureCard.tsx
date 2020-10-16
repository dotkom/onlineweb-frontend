import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { getEventColor, IEvent } from 'events/models/Event';
import style from './detail.less';

import EventImage from '../EventImage';
import Block from './Block';
import CardHeader from './Card/CardHeader';

interface IProps {
  event: IEvent;
}

const PictureCard: FC<IProps> = ({ event }) => {
  const { images, start_date, end_date, location, event_type } = event;

  const color = getEventColor(event_type);
  const startDate = DateTime.fromISO(start_date).toFormat('d. MMM');
  const startTime = DateTime.fromISO(start_date).toFormat('HH:mm');
  const endDate = DateTime.fromISO(end_date).toFormat('d. MMM');
  const endTime = DateTime.fromISO(end_date).toFormat('HH:mm');
  const weekday = DateTime.fromISO(start_date).weekdayLong;

  return (
    <div className={style.pictureCard}>
      <div>
        <EventImage images={images} size="md" color={color} />
      </div>
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
            <p className={style.capitalized}>{endDate}</p>
            <p className={style.capitalized}>{endTime}</p>
          </Block>

          <Block title="Sted">
            <p>{location}</p>
          </Block>

          <Block title="Ukedag">
            <p className={style.capitalized}>{weekday}</p>
          </Block>
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
