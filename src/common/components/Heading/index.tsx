import React, { Props } from 'react';
import style from './heading.less';

export interface IProps extends React.HtmlHTMLAttributes<IProps> {
  title?: string;
}

const Heading = ({ title, children }: IProps) => (
  <div className={style.grid}>
    <h1>{title || children}</h1>
  </div>
);

export default Heading;
