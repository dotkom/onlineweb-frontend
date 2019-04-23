import React, { ChangeEvent, FC, HTMLProps } from 'react';

import style from './search.less';

export interface IProps extends HTMLProps<HTMLInputElement> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: FC<IProps> = ({ placeholder = 'Søk', onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(event);
  };
  return (
    <input className={style.searchInput} type="search" placeholder={placeholder} onChange={handleChange} {...props} />
  );
};
