import React, { FC } from 'react';

import { Committee } from 'profile/models/Comittee';
import { getCommitteeMedal } from 'profile/utils/comittee';

import style from './medals.less';

export interface IProps {
  committee: Committee;
}

export const MedalIcon: FC<IProps> = ({ committee }) => {
  const MedalComponent = getCommitteeMedal(committee);
  return <div className={style.medal}>{MedalComponent && <MedalComponent />}</div>;
};
