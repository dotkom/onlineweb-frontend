import React, { FormEvent } from 'react';
import TagList from './TagList';
import SearchBox from '../components/SearchBox';
import { ITag, Tags } from '../models/Tag';

import style from '../less/career.less';

export interface IFilterListProps {
  handleTagChange: Function;
  tags: Tags;
  handleReset: Function;
  handleFilterChange: Function;
  filterText: string;
}

const FilterList = ({ tags, filterText, handleTagChange, handleReset, handleFilterChange }: IFilterListProps) => (
  <div>
    <div className={style.filters}>
      <SearchBox text={filterText} onChange={(e: FormEvent<HTMLFormElement>) => handleFilterChange(e)} />

      <TagList
        heading="Bedrifter"
        tags={tags.companies}
        handleChange={(tag: any) => {
          handleTagChange('companies', tag);
        }}
      />

      <TagList
        heading="Typer"
        tags={tags.jobTypes}
        handleChange={(tag: any) => {
          handleTagChange('jobTypes', tag);
        }}
      />

      <TagList
        heading="Sted"
        tags={tags.locations}
        handleChange={(tag: any) => {
          handleTagChange('locations', tag);
        }}
      />

      {/*<TagList
        heading="Frist"
        tags={tags.deadlines}
        handleChange={(tag: any) => {
          handleTagChange('deadlines', tag, true);
        }}
      />*/}

      <button onClick={() => handleReset()}>Reset</button>
    </div>
  </div>
);

export default FilterList;
