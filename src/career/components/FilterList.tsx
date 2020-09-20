import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';

import { careerLocationSelectors } from 'career/slices/careerLocations';
import {
  careerOpportunitySelectors,
  resetCareerFilters,
  toggleCareerFilterCompany,
  toggleCareerFilterJobType,
  toggleCareerFilterLocation,
} from 'career/slices/careerOpportunities';
import { jobTypeSelectors } from 'career/slices/jobTypes';
import { companySelectors } from 'companies/slices/companies';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import SearchBox from '../components/SearchBox';
import style from '../less/career.less';
import TagList from './TagList';

const FilterList: FC = () => {
  const dispatch = useDispatch();
  const selectedCompanyIds = useSelector((state) => state.careerOpportunities.filters.companyIds, shallowEqual);
  const selectedJobTypeIds = useSelector((state) => state.careerOpportunities.filters.jobTypeIds, shallowEqual);
  const selectedLocationIds = useSelector((state) => state.careerOpportunities.filters.locationIds, shallowEqual);
  const companies = useSelector(selectCompanyTagList());
  const jobTypes = useSelector(selectJobTypeTagList());
  const locations = useSelector(selectLocationTagList());

  const toggleCompany = (companyId: number) => {
    dispatch(toggleCareerFilterCompany(companyId));
  };

  const toggleJobType = (jobTypeId: number) => {
    dispatch(toggleCareerFilterJobType(jobTypeId));
  };

  const toggleLocation = (locationId: string) => {
    dispatch(toggleCareerFilterLocation(locationId));
  };

  const onReset = () => {
    dispatch(resetCareerFilters());
  };

  return (
    <div>
      <div className={style.filters}>
        <SearchBox />
        <TagList heading="Bedrifter" tags={companies} selectedIds={selectedCompanyIds} onToggle={toggleCompany} />
        <TagList heading="Typer" tags={jobTypes} selectedIds={selectedJobTypeIds} onToggle={toggleJobType} />
        <TagList heading="Sted" tags={locations} selectedIds={selectedLocationIds} onToggle={toggleLocation} />
        <button onClick={onReset} className={style.resetBtn}>
          Reset
        </button>
      </div>
    </div>
  );
};

const selectCompanyTagList = () => (state: State) => {
  const relevantCompanyIds = careerOpportunitySelectors
    .selectAll(state)
    .map((opportunity) => opportunity.company.id)
    .filter((companyId, i, allIds) => allIds.indexOf(companyId) === i);
  const companies = companySelectors
    .selectAll(state)
    .filter((company) => relevantCompanyIds.some((companyId) => company.id === companyId));
  const companyTags = companies.map((company) => ({ id: company.id, text: company.name }));
  return companyTags;
};

const selectJobTypeTagList = () => (state: State) => {
  return jobTypeSelectors.selectAll(state).map((jobType) => ({ id: jobType.id, text: jobType.name }));
};

const selectLocationTagList = () => (state: State) => {
  return careerLocationSelectors.selectAll(state).map((location) => ({ id: location.slug, text: location.name }));
};

export default FilterList;
