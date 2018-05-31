import React from 'react';
import classNames from 'classnames';

export interface ITagProps {
  title: string;
  selected: boolean;
  handleChange: Function;
  changeKey: string;
};

const Tag = ({ selected, title, changeKey, handleChange }: ITagProps) => (
  <button
    className={classNames({ selected })}
    onClick={() => handleChange(changeKey)}
  >
    {title}
  </button>
);

export default Tag;
