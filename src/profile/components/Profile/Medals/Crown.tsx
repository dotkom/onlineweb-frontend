import React, { FC } from 'react';

import { CommitteePosition } from 'profile/models/Comittee';
import { getPositionCrown } from 'profile/utils/comittee';

import style from './medals.less';

export interface IProps {
  position: CommitteePosition;
}

export const Crown: FC<IProps> = ({ position }) => {
  const CrownComponent = getPositionCrown(position);
  return <div className={style.crown}>{CrownComponent && <CrownComponent />}</div>;
};
