import classNames from 'classnames';
import React from 'react';
import style from '../less/career.less';

export interface IProps {
  title: string;
  selected: boolean;
  onToggle: () => void;
}

const Tag = ({ selected, title, onToggle }: IProps) => (
  <button className={classNames({ [style.selected]: selected })} onClick={onToggle}>
    {title}
  </button>
);

export default Tag;
