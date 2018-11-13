import Heading from 'common/components/Heading';
import React, { FormEvent } from 'react';
import FilterList from '../components/FilterList';
import JobList from '../components/JobList';
import style from '../less/career.less';
import { IJob } from '../models/Job';
import { ITag, ITags } from '../models/Tag';

export interface IFilterableJobListProps {
  jobs: IJob[];
  tags: ITags;
  handleTagChange: (t: string, c: ITag, s: boolean) => void;
  handleReset: () => void;
  handleFilterChange: (e: React.FormEvent<any>) => void;
  filterText: string;
}

const FilterableJobList = (props: IFilterableJobListProps) => (
  <div>
    <Heading title="Karrieremuligheter" />
    <div className={style.topGrid}>
      <FilterList
        tags={props.tags}
        handleTagChange={(type: string, changedTag: ITag, switchMode?: boolean) =>
          props.handleTagChange(type, changedTag, switchMode || false)
        }
        handleReset={() => props.handleReset()}
        handleFilterChange={(e: FormEvent<HTMLFormElement>) => props.handleFilterChange(e)}
        filterText={props.filterText}
      />

      <JobList jobs={props.jobs} tags={props.tags} filterText={props.filterText} />
    </div>
  </div>
);

export default FilterableJobList;
