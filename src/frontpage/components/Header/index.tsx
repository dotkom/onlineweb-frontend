import React, { Props } from 'react';
import style from './header.less';

export interface IProps extends Props<IProps> {
  title: string;
}

const Header = ({ title, children }: IProps) => (
  <div className={style.grid}>
    <h3>{ title }</h3>
    { children }
  </div>
)

export default Header;