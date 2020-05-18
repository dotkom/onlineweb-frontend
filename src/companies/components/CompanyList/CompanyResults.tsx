import React from 'react';
import { shallowEqual } from 'react-redux';

import { State } from 'core/redux/Store';
import { companySelectors } from 'companies/slices/companies';
import { useSelector } from 'core/redux/hooks';

import { CompanyCard } from './CompanyCard';

import style from './CompanyResults.less';

export const CompanyResults = () => {
  const companyIds = useSelector(selectSearchResultCompanyIds(), shallowEqual);
  return (
    <div className={style.companiesContainer}>
      {companyIds.map((companyId) => (
        <CompanyCard key={companyId} companyId={companyId} />
      ))}
    </div>
  );
};

const selectSearchResultCompanyIds = () => (state: State) => {
  const resultIds = state.companies.search.ids;
  return companySelectors
    .selectIds(state)
    .map(Number)
    .filter((companyId) => resultIds.some((resultId) => resultId === companyId));
};
