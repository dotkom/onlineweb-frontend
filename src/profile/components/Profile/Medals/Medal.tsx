import React, { FC } from 'react';

import { IMedal } from 'profile/models/Medal';

import { Crown } from './Crown';
import { MedalIcon } from './MedalIcon';
import style from './medals.less';

export interface IProps {
  medal: IMedal;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const Medal: FC<IProps> = ({ medal, scrollRef }) => {
  const { committee, position, period } = medal;
  return (
    <div ref={scrollRef} className={style.medalContainer}>
      <div className={style.crownContainer}>
        <Crown position={position} />
      </div>
      <MedalIcon committee={committee} />
      <p className={style.yearRange}>{period}</p>
    </div>
  );
};
