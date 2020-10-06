import { DateTime } from 'luxon';
import Head from 'next/head';
import React, { FC } from 'react';

import { ICareerOpportunity } from 'career/models/Career';
import Heading from 'common/components/Heading';
import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { DOMAIN } from 'common/constants/endpoints';
import { getCompanyUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from '../less/career.less';
import { formatLocations } from './JobListItem';

import ApplyButton from './ApplyButton';

/**
 * @summary formats the deadline from ISO format to Date Month Year
 * @return the formated deadline as a string or the string "Ikke spesifisert" if deadline is null
 */
export const formatDeadline = (deadline: string): string => {
  if (deadline) {
    return DateTime.fromISO(deadline).toFormat('d MMM y');
  }
  return 'Ikke spesifisert';
};

interface IProps {
  opportunity: ICareerOpportunity;
}

const JobDetails: FC<IProps> = ({ opportunity }) => (
  <div>
    <Head>
      <meta property="og:title" content={opportunity.title} />
      <meta property="og:description" content={opportunity.ingress} />
      <meta property="og:image" content={`${DOMAIN}${opportunity.company.image.sm}`} />
      <meta property="og:article:published_time" content={opportunity.start} />
      <meta property="og:article:expiration_time" content={opportunity.end} />
      <meta property="og:article:tag" content={opportunity.company.name} />
      <meta property="og:article:tag" content={opportunity.employment.name} />
      {opportunity.location.map((location) => (
        <meta property="og:article:tag" content={location.name} key={location.slug} />
      ))}
    </Head>
    <Heading title={opportunity.title} />
    <div className={style.detail}>
      <Markdown className={style.jobDescription} source={opportunity.description} escapeHtml />
      <div>
        <div className={style.company}>
          <Link {...getCompanyUrl(opportunity.company.id)}>
            <a className={style.companyImage}>
              <ResponsiveImage
                image={opportunity.company.image}
                size="lg"
                alt={opportunity.company.name}
                type="company"
              />
            </a>
          </Link>

          <div className={style.companyDescriptionBox}>
            <Link {...getCompanyUrl(opportunity.company.id)}>
              <a className={style.companyDescriptionTitle}>
                <h3>{opportunity.company.name}</h3>
              </a>
            </Link>
            <Markdown
              className={style.companyDescriptionContent}
              source={opportunity.company.short_description}
              escapeHtml
            />
          </div>
          <div className={style.keyInfo}>
            <h3>Nøkkelinformasjon</h3>
            <p>Type: {opportunity.employment.name}</p>
            <p>Sted: {formatLocations(opportunity.location.map((loc) => loc.name))}</p>
            <p>Frist: {formatDeadline(opportunity.deadline)}</p>
          </div>
          <ApplyButton
            application_link={opportunity.application_link}
            application_email={opportunity.application_email}
          />
        </div>
      </div>
    </div>
  </div>
);

export default JobDetails;
