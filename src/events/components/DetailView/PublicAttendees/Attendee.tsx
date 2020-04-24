import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import { IPublicAttedee } from 'events/models/Attendee';

import style from './Attendee.less';

interface IProps {
  count: number;
  attendee: IPublicAttedee;
}

export const Attendee: FC<IProps> = ({ attendee, count }) => {
  return (
    <div className={style.container}>
      <p className={style.count}>{count}</p>
      <p className={style.name}>{attendee.full_name}</p>
      <p>{`${attendee.year_of_study}. klasse`}</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={attendee.is_visible ? faUserFriends : faUserSecret} fixedWidth />
      </div>
    </div>
  );
};
