import { ICareerOpportunity } from 'career/models/Career';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { Link } from 'core/components/Router';
import React from 'react';
import style from '../less/career.less';
import { formatDeadline } from './JobDetails';

// Accepts a list of locations and returns a comma-separated list of locations
// with 'og' inserted before the last element, and 'Ikke spesifisert' if no
// locations have been specified.
export const formatLocations = (locations: any) => {
  if (locations.length >= 2) {
    // If we have more than 2 elements, return a comma-separated list.
    return `${locations.slice(0, -1).join(', ')} og ${locations[locations.length - 1]}`;
  } else if (locations.length === 1) {
    // Do not format the location if we only have 1 element.
    return locations[0];
  }

  // No locations have been specified.
  return 'Ikke spesifisert';
};

const JobListItem = ({ location, deadline, company, title, ingress, id, employment }: ICareerOpportunity) => (
  <div className={style.job}>
    <Link to={`/career/${id}`}>
      <ResponsiveImage image={company.image} size="md" alt="Firmalogo" />
    </Link>
    <div className={style.jobInfo}>
      <Link to={`/career/${id}`}>
        <h2 className={style.jobInfoTitle}>
          {company.name} - {title}
        </h2>
      </Link>

      <p className={style.ingress}>{ingress}</p>

      <div className={style.jobMeta}>
        <p>Type: {employment.name}</p>
        <p>Sted: {formatLocations(location.map((loc) => loc.name))}</p>
        <p>Frist: {formatDeadline(deadline)}</p>
      </div>
    </div>
  </div>
);

export default JobListItem;
