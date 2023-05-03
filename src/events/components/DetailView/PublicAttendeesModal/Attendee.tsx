import React, { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPublicAttendee } from 'events/models/Attendee';
import Twitter_Verified_Badge from 'events/components/Images/Twitter_Verified_Badge.svg';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import style from './Attendee.less';

interface IProps {
  count: number;
  attendee: IPublicAttendee;
}

export const Attendee: FC<IProps> = ({ attendee, count }) => {
  const specialList = ['mads hermansen'];
  return (
    <div
      className={style.container}
      style={
        specialList.includes(attendee.full_name.toLowerCase())
          ? {
              background: 'linear-gradient(45deg, gold, white)',
            }
          : { backgroundColor: '' }
      }
    >
      <p className={style.count}>{count}</p>
      <p className={style.name}>
        {attendee.full_name}
        {specialList.includes(attendee.full_name.toLowerCase()) ? (
          <span
            style={{
              width: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.1rem',
            }}
          >
            <img
              src={Twitter_Verified_Badge}
              alt="Verified Badge"
              className={style.image}
              title="Kjøpt under veldedighetsfest 2023"
            />
          </span>
        ) : null}
      </p>
      <p>{`${attendee.year_of_study}. klasse`}</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={attendee.is_visible ? faUserFriends : faUserSecret} fixedWidth />
      </div>
    </div>
  );
};
