import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons/faGlobeEurope';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import { ICompany } from 'companies/models/Company';

import style from './SideBar.less';

interface IProps {
  company: ICompany;
}

export const SideBar: FC<IProps> = ({ company }) => {
  return (
    <div className={style.container}>
      <ResponsiveImage image={company.image} size="sm" type="company" />
      <div>
        <Icon icon={faGlobeEurope} fixedWidth />
        <a href={company.site}>{company.site}</a>
      </div>
      {company.email_address && company.email_address !== '' && (
        <div>
          <Icon icon={faAt} fixedWidth />
          <a href={`mailto:${company.email_address}`}>{company.email_address}</a>
        </div>
      )}
      {company.phone_number && company.phone_number !== '' && (
        <div>
          <Icon icon={faPhone} fixedWidth />
          <a href={`tel:${company.phone_number}`}>{company.phone_number}</a>
        </div>
      )}
    </div>
  );
};
