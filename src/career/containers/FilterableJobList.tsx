import React, { FormEvent } from 'react';
import FilterList from '../components/FilterList';
import JobList from '../components/JobList';
import { IJob } from '../models/Job';
import { ITags, Tags, ITag } from '../models/Tag';
import Header from 'frontpage/components/Header';
import style from '../less/career.less';
import { containerFluid } from 'core/less/core.less';

export interface IFilterableJobListProps {
  jobs: IJob[];
  tags: Tags;
  handleTagChange: Function;
  handleReset: Function;
  handleFilterChange: Function;
  filterText: string;
}

const FilterableJobList = (props: IFilterableJobListProps) => (
  <div className={containerFluid}>
    <Header>
      KARRIEREMULIGHETER
    </Header>
    <div className={style.topGrid}>
      <FilterList
        tags={props.tags}
        handleTagChange={(type: string, changedTag: ITag, switchMode: boolean) =>
          props.handleTagChange(type, changedTag, switchMode)}
        handleReset={() => props.handleReset()}
        handleFilterChange={(e: FormEvent<HTMLFormElement>) => props.handleFilterChange(e)}
        filterText={props.filterText}
      />

      <JobList
        jobs={props.jobs}
        tags={props.tags}
        filterText={props.filterText}
      />
    </div>
  </div>
);

export default FilterableJobList;
