import { getOnlineGroup } from 'groups/api';
import { IOnlineGroup } from 'groups/models/onlinegroup';
import React, { useEffect, useState } from 'react';
import { getEventColor, IEvent } from '../../models/Event';
import Block from './Block';
import CardHeader from './Card/CardHeader';
import style from './detail.less';

const Contact = ({ event_type, organizer, company_event }: IEvent) => {
  const [organizerGroup, setOrganizerGroup] = useState<IOnlineGroup | null>(null);
  const color = getEventColor(event_type);
  const fetchOragnizer = async () => {
    const group = await getOnlineGroup(organizer);
    setOrganizerGroup(group);
  };

  useEffect(() => {
    fetchOragnizer();
  }, [organizer]);

  return (
    <div className={style.contact}>
      <CardHeader className={style.detailHeader} color={color}>
        Kontakt
      </CardHeader>
      <Block title="Arrangør">
        {organizerGroup ? (
          <>
            <p>{organizerGroup.name_short}</p>
            <a href={`mailto:${organizerGroup.email}`}>{organizerGroup.email}</a>
          </>
        ) : null}
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
