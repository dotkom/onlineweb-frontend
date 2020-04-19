import React, { FC } from 'react';

import style from '../../less/profile.less';

interface IProps {
  name: string;
  icon: string;
}

const InfoGroup: FC<IProps> = ({ children, name }) => {
  return (
    <div className={style.infoGroup}>
      <h1>{name}</h1>
      <div className={style.groupWrapper}>{children}</div>
    </div>
  );
};

export default InfoGroup;
