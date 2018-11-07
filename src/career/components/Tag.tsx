import classNames from 'classnames';
import React from 'react';
import style from '../less/career.less';

export interface ITagProps {
  title: string;
  selected: boolean;
  handleChange: (s: string) => void;
  changeKey: string;
}

const Tag = ({ selected, title, changeKey, handleChange }: ITagProps) => (
  <button className={classNames({ [style.selected]: selected })} onClick={() => handleChange(changeKey)}>
    {title}
  </button>
);

export default Tag;
