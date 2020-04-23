import React, { FC, useEffect } from 'react';

import { companySelectors, fetchCompanyById } from 'companies/slices/companies';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { fetchOnlineGroupById, onlineGroupSelectors } from 'groups/slices/onlineGroups';

import { getEventColor, IEvent } from '../../models/Event';
import Block from './Block';
import CardHeader from './Card/CardHeader';
import style from './detail.less';

interface IProps {
  event: IEvent;
}

const Contact: FC<IProps> = ({ event }) => {
  const { event_type, organizer: organizerId, companies: companyIds } = event;
  const dispatch = useDispatch();
  const organizer = useSelector((state) => onlineGroupSelectors.selectById(state, organizerId));
  const companies = useSelector(selectCompaniesByIds(companyIds));
  const color = getEventColor(event_type);

  useEffect(() => {
    dispatch(fetchOnlineGroupById(organizerId));
  }, [organizerId]);

  useEffect(() => {
    companyIds.forEach((companyId) => {
      dispatch(fetchCompanyById(companyId));
    });
  }, [String(companyIds)]);

  return (
    <div className={style.contact}>
      <CardHeader className={style.detailHeader} color={color}>
        Kontakt
      </CardHeader>
      <Block title="Arrangør">
        {organizer ? (
          <>
            <p>{organizer.name_short}</p>
            <a href={`mailto:${organizer.email}`}>{organizer.email}</a>
          </>
        ) : null}
      </Block>

      {companyIds.length > 0 && (
        <Block title="Medarrangør">
          {companies.map((company) => (
            <p key={company.id}>{company.name}</p>
          ))}
        </Block>
      )}
    </div>
  );
};

const selectCompaniesByIds = (companyIds: number[]) => (state: State) => {
  return companySelectors
    .selectAll(state)
    .filter((company) => companyIds.some((companyId) => companyId === company.id));
};

export default Contact;
