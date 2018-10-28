import React from 'react';
import Verification from 'common/components/Verification';
import style from './notifications.less';

export interface IProps {
  name: string;
  value: boolean;
}

const BrowserSupport = ({ name, value }: IProps) => (
  <div className={style.element}>
    <h4>{ name }</h4>
    <div className={style.toggle}>
      <Verification checked={value}/>
    </div>
  </div>
);

export default BrowserSupport;
