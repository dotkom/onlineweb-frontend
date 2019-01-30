import { CareerContext } from 'career/providers/CareerProvider';
import React, { Component, ContextType } from 'react';
import style from '../less/career.less';
import JobListItem from './JobListItem';

class JobList extends Component<{}> {
  public static contextType = CareerContext;
  public context!: ContextType<typeof CareerContext>;

  public render() {
    const { jobs } = this.context;
    return (
      <div className={style.jobList}>
        {jobs.map((job) => (
          <JobListItem {...job} key={job.id} />
        ))}
      </div>
    );
  }
}

export default JobList;
