import classnames from 'classnames';
import { Link } from 'core/components/Router';
import React from 'react';
import style from './menu.less';

export interface IProps {
  path: string;
  active: boolean;
  text: string;
}

const Tab = ({ path, active, text }: IProps) => (
  <Link
    to={path}
    className={classnames(style.tab, {
      [style.active]: active,
    })}
  >
    <p>{text}</p>
  </Link>
);

export default Tab;
