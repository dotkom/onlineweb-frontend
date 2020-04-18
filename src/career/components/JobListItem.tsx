import React, { FC } from 'react';

import { careerOpportunitySelectors } from 'career/slices/careerOpportunities';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { getCareerOpportinityUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';

import { formatDeadline } from './JobDetails';

import style from '../less/career.less';

// Accepts a list of locations and returns a comma-separated list of locations
// with 'og' inserted before the last element, and 'Ikke spesifisert' if no
// locations have been specified.
export const formatLocations = (locations: string[]) => {
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

interface IProps {
  opportunityId: number;
}

const JobListItem: FC<IProps> = ({ opportunityId }) => {
  const opportunity = useSelector((state) => careerOpportunitySelectors.selectById(state, opportunityId));
  if (!opportunity) {
    return null;
  }

  const { location, deadline, company, title, ingress, id, employment, featured } = opportunity;
  return (
    <div className={style.job}>
      <Link {...getCareerOpportinityUrl(id)}>
        <a>
          <ResponsiveImage image={company.image} size="md" alt="Firmalogo" type="company" />
        </a>
      </Link>
      <div className={style.jobInfo}>
        <Link {...getCareerOpportinityUrl(id)}>
          <a>
            <h2 className={style.jobInfoTitle}>
              {company.name} - {title}
            </h2>
          </a>
        </Link>
        {featured && <p className={style.promoted}>Fremhevet plassering</p>}

        <p className={style.ingress}>{ingress}</p>

        <div className={style.jobMeta}>
          <p>Type: {employment.name}</p>
          <p>Sted: {formatLocations(location.map((loc) => loc.name))}</p>
          <p>Frist: {formatDeadline(deadline)}</p>
        </div>
      </div>
    </div>
  );
};

export default JobListItem;
