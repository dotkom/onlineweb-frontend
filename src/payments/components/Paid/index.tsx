import React, { FC } from 'react';

import Check from 'common/components/Verification/Check';
import Cross from 'common/components/Verification/Cross';

import style from './paid.less';

export interface IPaidProps {
  paid: boolean;
}

export const Paid: FC<IPaidProps> = ({ paid }) => {
  return <p className={style.icon}>{paid ? <Check /> : <Cross />}</p>;
};
