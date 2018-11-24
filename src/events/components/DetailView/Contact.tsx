import React from 'react';
import { getEventColor, INewEvent } from '../../models/Event';
import Block from './Block';
import CardHeader from './Card/CardHeader';
import style from './detail.less';

const Contact = ({ event_type, organizer_name, company_event }: INewEvent) => {
  const color = getEventColor(event_type);

  const organizerEmail = `${organizer_name.toLowerCase()}@online.ntnu.no`;

  return (
    <div className={style.contact}>
      <CardHeader className={style.detailHeader} color={color}>
        Kontakt
      </CardHeader>
      <Block title="Arrangør">
        <p>{organizer_name}</p>
        <a href={`mailto:${organizerEmail}`}>{organizerEmail}</a>
      </Block>

      {company_event && company_event.length > 0 && (
        <Block title="Medarrangør">
          {company_event.map(({ company }) => (
            <p key={company.id}>{company.name}</p>
          ))}
        </Block>
      )}
    </div>
  );
};

export default Contact;
