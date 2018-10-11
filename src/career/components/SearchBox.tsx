import React from 'react';
import style from '../less/career.less';

export interface ISearchBoxProps {
  onChange: Function
  text: string
}

const SearchBox = ({ onChange, text }: ISearchBoxProps) => (
  <div>
    <h3>Søk</h3>
    <input className={style.searchBox}
      type="search"
      value={text}
      onChange={e => onChange(e)}
    />
  </div>
);

export default SearchBox;
