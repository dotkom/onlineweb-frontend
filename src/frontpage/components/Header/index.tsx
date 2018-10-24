import React, { Props } from 'react';
import style from './header.less';

export interface IProps extends React.HtmlHTMLAttributes<IProps> {
  title?: string;
}

const Header = ({ title, children }: IProps) => (
  <div className={style.grid}>
    <h3>{ title || children }</h3>
  </div>
);

export default Header;
