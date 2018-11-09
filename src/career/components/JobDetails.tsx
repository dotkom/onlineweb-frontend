import Heading from 'common/components/Heading';
import Img from 'common/components/Img';
import Markdown from 'common/components/Markdown';
import React from 'react';
import { Link } from 'react-router-dom';
import style from '../less/career.less';
import { formatLocations } from './JobListItem';

export interface IJobDetails {
  title: string;
  deadline: string;
  locations: string[];
  description: string;
  type: string;
  companyName: string;
  companyDescription: string;
  companyImage: any;
  companyId: number;
}

const JobDetails = (props: IJobDetails) => (
  <div>
    <Heading title={props.title} />
    <div className={style.detail}>
      <Markdown className={style.jobDescription} source={props.description} escapeHtml />
      <div>
        <div className={style.company}>
          <Link className={style.companyImage} to={`/company/${props.companyId}`}>
            <Img src={props.companyImage.lg} alt={props.companyName} />
          </Link>
          <div className={style.companyDescriptionBox}>
            <Link className={style.companyDescriptionTitle} to={`/company/${props.companyId}`}>
              <h3>{props.companyName}</h3>
            </Link>
            <Markdown className={style.companyDescriptionContent} source={props.companyDescription} escapeHtml />
          </div>
          <div className={style.keyInfo}>
            <h3>Nøkkelinformasjon</h3>
            <p>Type: {props.type}</p>
            <p>Sted: {formatLocations(props.locations)}</p>
            <p>Frist: {props.deadline}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JobDetails;
