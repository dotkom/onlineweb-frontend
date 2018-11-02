import React, { Props } from 'react';
import style from './heading.less';

export interface IProps extends React.HtmlHTMLAttributes<IProps> {
  title?: string;
}

const Heading = ({ title, children }: IProps) => (
  <div className={style.grid}>
    <h3>{title || children}</h3>
  </div>
);

export default Heading;
