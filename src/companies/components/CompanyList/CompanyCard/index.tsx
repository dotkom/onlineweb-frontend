import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import style from './CompanyCard.less';
import { companySelectors } from 'companies/slices/companies';
import { ICompany } from 'companies/models/Company';
import { getCompanyUrl } from 'core/appUrls';

interface IProps {
  companyId: number;
}

export const CompanyCard: FC<IProps> = ({ companyId }) => {
  const company = useSelector(selectCompanyById(companyId));
  return (
    <Link {...getCompanyUrl(companyId)}>
      <a className={style.companyCard}>
        <div className={style.imageContainer}>
          <ResponsiveImage image={company.image} />
        </div>
        <h2 className={style.title}>{company.name}</h2>
        <Markdown source={company.short_description} />
        <p className={style.linksContainer}>
          <a href={company.site} className={style.link}>
            Gå til bedriftens hjemmeside
          </a>
        </p>
      </a>
    </Link>
  );
};

const selectCompanyById = (companyId: number) => (state: State) => {
  return companySelectors.selectById(state, companyId) as ICompany;
};
