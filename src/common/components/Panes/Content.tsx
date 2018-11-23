import React, { ReactNode } from 'react';
import style from './profileCommon.less';

export interface IContentProps {
  title: string;
  children: ReactNode;
}

export const Content = ({ children, title }: IContentProps) => (
  <div className={style.content}>
    <h2>{title}</h2>
    <div>{children}</div>
  </div>
);

export default Content;
