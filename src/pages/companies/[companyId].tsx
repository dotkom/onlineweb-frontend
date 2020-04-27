import { NextPage, NextPageContext } from 'next';
import React from 'react';

import { CompanyDetail } from 'companies/components/CompanyDetail';
import { companySelectors, fetchCompanyById } from 'companies/slices/companies';
import { Store } from 'core/redux/Store';

interface IContext extends NextPageContext {
  store: Store;
}

interface IProps {
  companyId: number;
}

const CompanyDetailPage: NextPage<IProps> = ({ companyId }) => {
  return <CompanyDetail companyId={companyId} />;
};

CompanyDetailPage.getInitialProps = async ({ query, store }: IContext) => {
  const companyId = Number(query.companyId);
  const isCompanyInStore = Boolean(companySelectors.selectById(store.getState(), companyId));
  const result = store.dispatch(fetchCompanyById(companyId));
  if (!isCompanyInStore) {
    await result;
  }
  return { companyId };
};

export default CompanyDetailPage;
