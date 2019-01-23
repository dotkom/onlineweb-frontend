import { Committee } from 'profile/models/Comittee';
import { getCommitteeMedal } from 'profile/utils/comittee';
import React from 'react';
import style from '../../less/profile.less';

export interface IProps {
  committee: Committee;
}

const MedalIcon = ({ committee }: IProps) => {
  const MedalComponent = getCommitteeMedal(committee);
  return <div className={style.committeeMedal}>{MedalComponent && <MedalComponent />}</div>;
};

export default MedalIcon;
