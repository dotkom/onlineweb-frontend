import React, { useCallback, useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import { fetchAllCareerOpportunityContent, filterCareerOpportunities } from 'career/slices/careerOpportunities';
import Heading from 'common/components/Heading';
import Spinner from 'common/components/Spinner';
import { useDispatch, useSelector } from 'core/redux/hooks';

import FilterList from '../components/FilterList';
import JobList from '../components/JobList';
import style from '../less/career.less';

const FilterableJobList = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.careerOpportunities.filters.query);
  const locations = useSelector((state) => state.careerOpportunities.filters.locationIds, shallowEqual);
  const companies = useSelector((state) => state.careerOpportunities.filters.companyIds, shallowEqual);
  const jobTypes = useSelector((state) => state.careerOpportunities.filters.jobTypeIds, shallowEqual);
  const opportunityIds = useSelector((state) => state.careerOpportunities.search.ids, shallowEqual);
  const isPending = useSelector((state) => state.careerOpportunities.loading === 'pending');

  const executeSearch = useCallback(
    (query: string, locationIds: string[], companyIds: number[], jobTypeIds: number[]) => {
      dispatch(filterCareerOpportunities({ query, locationIds, companyIds, jobTypeIds }));
    },
    [dispatch]
  );

  useEffect(() => {
    executeSearch(searchQuery, locations, companies, jobTypes);
  }, [executeSearch, searchQuery, String(locations), String(companies), String(jobTypes)]);

  useEffect(() => {
    dispatch(fetchAllCareerOpportunityContent());
  }, []);

  if (isPending && !opportunityIds.length) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading title="Karrieremuligheter" />
      <div className={style.topGrid}>
        <FilterList />
        <JobList opportunityIds={opportunityIds} />
      </div>
    </div>
  );
};

export default FilterableJobList;
