import React, { FC, useEffect } from 'react';

import { careerOpportunitySelectors, fetchAllCareerOpportunityContent } from 'career/slices/careerOpportunities';
import Heading from 'common/components/Heading';
import { companySelectors } from 'companies/slices/companies';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import { CareerOppotunity } from './CareerOpportunity';
import style from './CompanyCareerOpportunities.less';

interface IProps {
  companyId: number;
}

export const CompanyCareerOpportunities: FC<IProps> = ({ companyId }) => {
  const dispatch = useDispatch();
  const opportunities = useSelector(selectOpportunitiesForCompany(companyId));
  const companyName = useSelector(selectCompanyName(companyId));
  const isPending = useSelector(selectAreOpportunitiesPending());

  useEffect(() => {
    dispatch(fetchAllCareerOpportunityContent());
  }, []);

  return (
    <div className={style.layout}>
      <Heading title="Aktive jobbannonser" />
      {opportunities.length !== 0 ? (
        <div className={style.grid}>
          {opportunities.map((opporunity) => (
            <CareerOppotunity key={opporunity.id} oppotunity={opporunity} />
          ))}
        </div>
      ) : isPending ? (
        <p>Laster resultater...</p>
      ) : (
        <p>{`${companyName} har ingen aktive jobbannonser for øyeblikket.`}</p>
      )}
    </div>
  );
};

const selectOpportunitiesForCompany = (companyId: number) => (state: State) => {
  return careerOpportunitySelectors.selectAll(state).filter((opportunity) => opportunity.company.id === companyId);
};

const selectCompanyName = (companyId: number) => (state: State) => {
  return companySelectors.selectById(state, companyId)?.name || '';
};

const selectAreOpportunitiesPending = () => (state: State) => {
  return state.careerOpportunities.loading === 'pending';
};
