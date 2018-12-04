import { CareerContext } from 'career/providers/CareerProvider';
import React, { Component, ContextType } from 'react';
import style from '../less/career.less';

class SearchBox extends Component<{}> {
  public static contextType = CareerContext;
  public context!: ContextType<typeof CareerContext>;

  public render() {
    const { filterText, handleFilterChange } = this.context;
    return (
      <div>
        <h2>Søk</h2>
        <input className={style.searchBox} type="search" value={filterText} onChange={handleFilterChange} />
      </div>
    );
  }
}

export default SearchBox;
