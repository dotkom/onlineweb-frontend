import React, { Props } from 'react';
import style from './profileCommon.less';

export const FourSplitPane = ({ children }: Props<any>) => (
  <div className={style.fourSplitPane}>
    { children }
  </div>
);

export default FourSplitPane;
