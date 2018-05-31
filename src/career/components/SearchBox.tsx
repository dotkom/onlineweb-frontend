import React from 'react';
import { FormControl } from 'react-bootstrap';

export interface ISearchBoxProps {
  onChange: Function
  text: string
}

const SearchBox = ({ onChange, text }: ISearchBoxProps) => (
  <div>
    <h3>Filtrer</h3>
    <FormControl
      type="search"
      value={text}
      onChange={e => onChange(e)}
    />
  </div>
);

export default SearchBox;
