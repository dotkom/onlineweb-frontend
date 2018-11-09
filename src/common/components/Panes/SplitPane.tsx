import React, { Props } from 'react';
import style from './profileCommon.less';

export const SplitPane = ({ children }: Props<any>) => (
  <div className={style.profileSplitPane}>
    { children }
  </div>
);

export default SplitPane;
