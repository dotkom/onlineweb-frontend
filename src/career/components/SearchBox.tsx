import { CareerContext, ICareerContextState } from 'career/providers/CareerProvider';
import React, { Component } from 'react';
import style from '../less/career.less';

class SearchBox extends Component<{}> {
  public static contextType = CareerContext;
  public render() {
    const { filterText, handleFilterChange }: ICareerContextState = this.context;
    return (
      <div>
        <h2>Søk</h2>
        <input className={style.searchBox} type="search" value={filterText} onChange={handleFilterChange} />
      </div>
    );
  }
}

export default SearchBox;
