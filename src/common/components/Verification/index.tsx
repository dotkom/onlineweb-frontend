import React from 'react';

import Check from './Check';
import Cross from './Cross';
import style from './verification.less';

export interface IProps {
  checked?: boolean;
}

const Verified = ({ checked = false }: IProps) => {
  return <div className={style.container}>{checked ? <Check /> : <Cross />}</div>;
};

export default Verified;
