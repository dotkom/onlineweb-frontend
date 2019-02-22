import classnames from 'classnames';
import React, { ReactNode } from 'react';
import style from './profileCommon.less';

export interface IPaneProps {
  children: ReactNode;
  className?: string;
}

export const Pane = ({ children, className }: IPaneProps) => (
  <div className={classnames(style.pane, className)}>
    <div>{children}</div>
  </div>
);

export default Pane;
