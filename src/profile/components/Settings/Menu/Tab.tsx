import React from 'react';
import { Link } from 'react-router-dom';
import style from './menu.less';
import classnames from 'classnames';

export interface IProps {
  path: string;
  active: boolean;
  text: string;
}

const Tab = ({ path, active, text }: IProps) => (
    <div className={classnames(style.tab, {
      [style.active]: active,
      [style.inactive]: !active,
    })}>
    <Link to={path}>
      <p className={style.text}>{ text }</p>
    </Link>
  </div>
);

export default Tab;
