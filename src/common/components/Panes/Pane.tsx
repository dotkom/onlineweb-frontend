import React, { Props } from 'react';
import style from './profileCommon.less';

export const Pane = ({ children }: Props<any>) => (
  <div className={style.pane}>
    <div>{children}</div>
  </div>
);

export default Pane;
