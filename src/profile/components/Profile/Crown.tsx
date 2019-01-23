import { CommitteePosition } from 'profile/models/Comittee';
import { getPositionCrown } from 'profile/utils/comittee';
import React from 'react';
import style from '../../less/profile.less';

export interface IProps {
  position: CommitteePosition;
}

const Crown = ({ position }: IProps) => {
  const CrownComponent = getPositionCrown(position);
  return <div className={style.committeeCrown}>{CrownComponent && <CrownComponent />}</div>;
};

export default Crown;
