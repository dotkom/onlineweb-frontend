import React from 'react';
import Markdown from 'react-markdown';
import { formatLocations } from './Job';
import style from '../less/career.less';
import globalStyle from 'core/less/core.less';
import Header from 'frontpage/components/Header';
import { Link } from 'react-router-dom';
import Img from 'common/components/Img';

export interface IInfoBox {
  title: string;
  deadline: string;
  locations: string[];
  description: string;
  type: string;
  companyName: string;
  companyDescription: string;
  companyImage: any;
  companyId: number
};

const InfoBox = (props: IInfoBox) => (
  <section>
    <div className="container">
      <Header>{ props.title }</Header>

      <div className={style.detail}>
        <div className={style.jobDescription}>
          <Markdown source={props.description} escapeHtml />
        </div>
        <div>
          <div className={style.company}>
            <Link to={`/company/${props.companyId}`}>
              <Img src={props.companyImage.lg} alt={props.companyName}></Img>
            </Link>
            <div>
              <div>
                <Link to={`/company/${props.companyId}`}>
                  <h3>{ props.companyName }</h3>
                </Link>
                <Markdown source={props.companyDescription} escapeHtml />
              </div>
            </div>
            <div>
              <div>
                <h3>Nøkkelinformasjon</h3>
                <p>Type: {props.type}</p>
                <p>Sted: {formatLocations(props.locations)}</p>
                <p>Frist: {props.deadline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InfoBox;
