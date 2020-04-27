import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { ICareerOpportunity } from 'career/models/Career';

import style from './CareerOpportunity.less';
import { Link } from 'core/components/Router';
import { getCareerOpportinityUrl } from 'core/appUrls';

interface IProps {
  oppotunity: ICareerOpportunity;
}

export const CareerOppotunity: FC<IProps> = ({ oppotunity }) => {
  const deadline = DateTime.fromISO(oppotunity.deadline).toLocaleString();
  return (
    <Link {...getCareerOpportinityUrl(oppotunity.id)}>
      <a className={style.container}>
        <p className={style.name}>{oppotunity.employment.name}</p>
        <p className={style.count}>{oppotunity.title}</p>
        <p>{oppotunity.location.map((location) => location.name)}</p>
        <p className={style.count}>{deadline}</p>
      </a>
    </Link>
  );
};
