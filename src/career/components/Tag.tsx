import classNames from 'classnames';
import React from 'react';
import style from '../less/career.less';

export interface IProps {
  title: string;
  selected: boolean;
  toggle: () => void;
}

const Tag = ({ selected, title, toggle }: IProps) => (
  <button className={classNames({ [style.selected]: selected })} onClick={toggle}>
    {title}
  </button>
);

export default Tag;
