import React, { FC, memo } from 'react';
import { shallowEqual } from 'react-redux';

import { careerOpportunitySelectors } from 'career/slices/careerOpportunities';
import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import style from '../less/career.less';
import JobListItem from './JobListItem';

interface IProps {
  opportunityIds: number[];
}

const JobList: FC<IProps> = ({ opportunityIds }) => {
  const filteredOpportunityIds = useSelector(selectCurrentylFilteredOpportunityIds(opportunityIds), shallowEqual);

  return (
    <div className={style.jobList}>
      {filteredOpportunityIds.map((opportunityId) => (
        <JobListItem key={opportunityId} opportunityId={opportunityId} />
      ))}
    </div>
  );
};

const selectCurrentylFilteredOpportunityIds = (opportunityIds: number[]) => (state: State) => {
  return careerOpportunitySelectors
    .selectIds(state)
    .map(Number)
    .filter((opportunityId) => opportunityIds.some((id) => id === opportunityId));
};

export default memo(JobList);
