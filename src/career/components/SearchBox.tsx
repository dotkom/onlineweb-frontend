import React from 'react';
import style from '../less/career.less';

export interface ISearchBoxProps {
  onChange: (e: React.FormEvent<any>) => void;
  text: string;
}

const SearchBox = ({ onChange, text }: ISearchBoxProps) => (
  <div>
    <h2>Søk</h2>
    <input className={style.searchBox} type="search" value={text} onChange={(e) => onChange(e)} />
  </div>
);

export default SearchBox;
