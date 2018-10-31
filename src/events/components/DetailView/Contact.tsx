import React from 'react';
import { INewEvent, getEventColor } from '../../models/Event';
import style from './detail.less';
import CardHeader from './Card/CardHeader';

const Contact = ({ event_type, company_event }: INewEvent) => {
  const color = getEventColor(event_type);

  return (
    <div className={style.contact}>
      <CardHeader color={color}>Kontakt</CardHeader>

      <div className={style.block}>
        <h3>Arrangør</h3>
        <p>Komitenavn</p>
      </div>

      <div className={style.block}>
        <h3>Ansvarlig</h3>
        <p>Navn Navnesen</p>
      </div>

      {company_event && company_event.length > 0 && (
        <div className={style.block}>
          <h3>Medarrangører</h3>

          {company_event.map(({ company }) => (
            <p key={company.id}>{company.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
