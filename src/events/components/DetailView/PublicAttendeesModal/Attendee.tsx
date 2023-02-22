import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import Twitter_Verified_Badge from 'events/components/Images/Twitter_Verified_Badge.svg';

import { IPublicAttendee } from 'events/models/Attendee';

import style from './Attendee.less';

interface IProps {
  count: number;
  attendee: IPublicAttendee;
}

export const Attendee: FC<IProps> = ({ attendee, count }) => {
  const specialList = [59520]; //Mattis Hembre = 59520
  return (
    <div
      className={style.container}
      style={
        specialList.includes(attendee.id)
          ? {
              background: 'linear-gradient(45deg, gold, white)',
            }
          : { backgroundColor: '' }
      }
    >
      <p className={style.count}>{count}</p>
      <p className={style.name}>
        {attendee.full_name}
        {specialList.includes(attendee.id) ? (
          <div
            style={{
              display: 'inline-block',
              marginLeft: '0.5rem',
              width: '1.5rem',
              height: '1.5rem',
              verticalAlign: 'middle',
            }}
          >
            <img src={Twitter_Verified_Badge} alt="Verified Badge" className={style.image} />
          </div>
        ) : null}
      </p>
      <p>{`${attendee.year_of_study}. klasse`}</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={attendee.is_visible ? faUserFriends : faUserSecret} fixedWidth />
      </div>
    </div>
  );
};
