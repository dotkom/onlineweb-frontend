import React, { FC } from 'react';

import { IHobbyGroup } from 'hobbygroups/models/HobbyGroup';

import { HobbyCard } from '../HobbyCard';
import style from './container.less';

export interface IProps {
  hobbies: IHobbyGroup[];
}

export const Hobbies: FC<IProps> = ({ hobbies }) => {
  return (
    <div className={style.hobbiesContainer}>
      {hobbies.map((hobby) => (
        <HobbyCard key={hobby.title} hobby={hobby} />
      ))}
    </div>
  );
};
