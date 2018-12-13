import { ICareerOpportunity } from 'career/models/Career';
import Heading from 'common/components/Heading';
import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { Link } from 'core/components/Router';
import { DateTime } from 'luxon';
import React from 'react';
import style from '../less/career.less';
import { formatLocations } from './JobListItem';

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

const JobDetails = (props: ICareerOpportunity) => (
  <div>
    <Heading title={props.title} />
    <div className={style.detail}>
      <Markdown className={style.jobDescription} source={props.description} escapeHtml />
      <div>
        <div className={style.company}>
          <Link className={style.companyImage} to={`/company/${props.company.id}`}>
            <ResponsiveImage image={props.company.image} size="lg" alt={props.company.name} />
          </Link>
          <div className={style.companyDescriptionBox}>
            <Link className={style.companyDescriptionTitle} to={`/company/${props.company.id}`}>
              <h3>{props.company.name}</h3>
            </Link>
            <Markdown className={style.companyDescriptionContent} source={props.company.short_description} escapeHtml />
          </div>
          <div className={style.keyInfo}>
            <h3>Nøkkelinformasjon</h3>
            <p>Type: {props.employment.name}</p>
            <p>Sted: {formatLocations(props.location.map((loc) => loc.name))}</p>
            <p>Frist: {formatDeadline(props.deadline)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JobDetails;
