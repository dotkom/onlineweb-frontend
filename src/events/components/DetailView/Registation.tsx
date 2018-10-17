import React from 'react';
import { INewEvent, getEventColor } from '../../models/Event';
import style from './detail.less';
import CardHeader from './Card/CardHeader';

const Registration = ({ event_type }: INewEvent) => {
  const color = getEventColor(event_type);
  return (
    <div className={style.registration}>
      <div className={style.cardMargin}>
        <CardHeader color={color}>Påmelding</CardHeader>
        <p></p>
      </div>
    </div>
  );
};

export default Registration;
