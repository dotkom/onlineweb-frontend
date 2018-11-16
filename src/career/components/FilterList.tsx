import { CareerContext, ICareerContextState } from 'career/providers/CareerProvider';
import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import style from '../less/career.less';
import TagList from './TagList';

class FilterList extends Component<{}> {
  public static contextType = CareerContext;

  public render() {
    const {
      handleReset,
      companies,
      toggleCompany,
      locations,
      toggleLocation,
      jobTypes,
      toggleJobType,
    }: ICareerContextState = this.context;
    return (
      <div>
        <div className={style.filters}>
          <SearchBox />

          <TagList heading="Bedrifter" tags={companies} handleChange={toggleCompany} />

          <TagList heading="Typer" tags={jobTypes} handleChange={toggleJobType} />

          <TagList heading="Sted" tags={locations} handleChange={toggleLocation} />

          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default FilterList;
