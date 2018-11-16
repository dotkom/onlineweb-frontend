import Heading from 'common/components/Heading';
import React from 'react';
import FilterList from '../components/FilterList';
import JobList from '../components/JobList';
import style from '../less/career.less';

const FilterableJobList = () => (
  <div>
    <Heading title="Karrieremuligheter" />
    <div className={style.topGrid}>
      <FilterList />
      <JobList />
    </div>
  </div>
);

export default FilterableJobList;
