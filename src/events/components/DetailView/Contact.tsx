import React from 'react';
import { INewEvent, getEventColor } from '../../models/Event';
import style from './detail.less';
import CardHeader from './Card/CardHeader';

const Contact = ({ event_type }: INewEvent) => {
  const color = getEventColor(event_type);
  return (
    <div className={style.contact}>
      <div className={style.cardMargin}>
        <CardHeader color={color}>Kontakt</CardHeader>
        <p />
      </div>
    </div>
  );
};

export default Contact;
