import React from 'react';
import { Link } from 'react-router-dom';
import { IJob } from '../models/Job';
import style from '../less/career.less';
import Img from 'common/components/Img';

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

const STATIC_URL = process.env.OW4_ADDRESS;

const Job = ({ locations, deadline, companyImage, companyName, title, ingress, type, id }: IJob) => (
  <div className={style.job}>
    <Link to={`/career/${id}`}>
      <Img src={companyImage.md} alt="Firmalogo" />
    </Link>
    <div className={style.jobInfo}>
      <Link to={`/career/${id}`}>
        <h2>
          {companyName} - {title}
        </h2>
      </Link>

      <div className={style.ingress}>{ingress}</div>

      <div className={style.jobMeta}>
        <p>Type: {type}</p>
        <p>Sted: {formatLocations(locations)}</p>
        <p>Frist: {deadline}</p>
      </div>
    </div>
  </div>
);

export default Job;
