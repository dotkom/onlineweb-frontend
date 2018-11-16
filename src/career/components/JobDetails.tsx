import { ICareerOpportunity } from 'career/models/Career';
import Heading from 'common/components/Heading';
import Img from 'common/components/Img';
import Markdown from 'common/components/Markdown';
import React from 'react';
import { Link } from 'react-router-dom';
import style from '../less/career.less';
import { formatLocations } from './JobListItem';

const JobDetails = (props: ICareerOpportunity) => (
  <div>
    <Heading title={props.title} />
    <div className={style.detail}>
      <Markdown className={style.jobDescription} source={props.description} escapeHtml />
      <div>
        <div className={style.company}>
          <Link className={style.companyImage} to={`/company/${props.company.id}`}>
            <Img src={props.company.image.lg} alt={props.company.name} />
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
            <p>Frist: {props.deadline}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JobDetails;
