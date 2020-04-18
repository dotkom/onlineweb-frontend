import { NextPage, NextPageContext } from 'next';
import React from 'react';

import DetailView from 'career/containers/DetailView';

import { careerOpportunitySelectors, fetchCareerOpportunityById } from 'career/slices/careerOpportunities';
import { Store } from 'core/redux/Store';

interface IContext extends NextPageContext {
  store: Store;
}

interface IProps {
  opportunityId: number;
}

const CareerDetailPage: NextPage<IProps> = ({ opportunityId }) => {
  return (
    <section>
      <DetailView opportunityId={opportunityId} />
    </section>
  );
};

CareerDetailPage.getInitialProps = async ({ query, store }: IContext) => {
  const opportunityId = Number(query.opportunityId);
  const isOpportunityInStore = Boolean(careerOpportunitySelectors.selectById(store.getState(), opportunityId));
  const result = store.dispatch(fetchCareerOpportunityById(opportunityId));
  if (!isOpportunityInStore) {
    await result;
  }
  return { opportunityId };
};

export default CareerDetailPage;
