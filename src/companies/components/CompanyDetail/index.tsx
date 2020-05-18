import Head from 'next/head';
import React, { FC, useEffect } from 'react';

import Heading from 'common/components/Heading';
import Spinner from 'common/components/Spinner';
import { DOMAIN } from 'common/constants/endpoints';
import { companySelectors, fetchCompanyById } from 'companies/slices/companies';
import HttpError from 'core/components/errors/HttpError';
import { useDispatch, useSelector } from 'core/redux/hooks';

import style from './CompanyDetail.less';
import { Description } from './Description';
import { SideBar } from './SideBar';
import { CompanyCareerOpportunities } from './CompanyCareerOpportunities';
import { CompanyEvents } from './CompanyEvents';

interface IProps {
  companyId: number;
}

export const CompanyDetail: FC<IProps> = ({ companyId }) => {
  const dispatch = useDispatch();
  const company = useSelector((state) => companySelectors.selectById(state, companyId));
  const isPending = useSelector((state) => state.companies.loading === 'pending');

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCompanyById(companyId));
  }, [companyId, dispatch]);

  if (isPending && !company) {
    return <Spinner />;
  }

  if (!company) {
    return <HttpError code={404} text="Denne bedriften er ikke tilgjengelig." />;
  }

  return (
    <section>
      <Head>
        <meta property="og:title" content={company.name} />
        <meta property="og:description" content={company.short_description} />
        <meta property="og:image" content={DOMAIN + company.image.lg} />
        <meta property="og:article:published_time" content={company.created_date} />
        <meta property="og:article:tag" content={company.site} />
        {company.email_address && <meta property="og:article:tag" content={company.email_address} />}
        {company.phone_number && <meta property="og:article:tag" content={company.phone_number} />}
      </Head>
      <div className={style.layout}>
        <div>
          <Heading title={company.name} />
          <Description description={company.long_description || company.short_description} />
        </div>
        <SideBar company={company} />
      </div>
      <CompanyEvents companyId={companyId} />
      <CompanyCareerOpportunities companyId={companyId} />
    </section>
  );
};
