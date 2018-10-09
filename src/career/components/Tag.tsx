import React from 'react';
import classNames from 'classnames';
import style from '../less/career.less';

export interface ITagProps {
  title: string;
  selected: boolean;
  handleChange: Function;
  changeKey: string;
};

const Tag = ({ selected, title, changeKey, handleChange }: ITagProps) => (
  <button
    className={classNames({ [style.selected]: selected })}
    onClick={() => handleChange(changeKey)}
  >
    {title}
  </button>
);

export default Tag;
