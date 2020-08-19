import Verification from 'common/components/Verification';
import React, { FC } from 'react';
import style from './notifications.less';

interface IProps {
  name: string;
  value: boolean;
}

const BrowserSupport: FC<IProps> = ({ name, value }) => {
  return (
    <div className={style.element}>
      <h4>{name}</h4>
      <div className={style.toggle}>
        <Verification checked={value} />
      </div>
    </div>
  );
};

export default BrowserSupport;
