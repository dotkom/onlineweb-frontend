import React from 'react';
import Markdown from 'react-markdown';
import { formatLocations } from './Job';
import style from '../less/career.less';
import globalStyle from 'core/less/core.less';

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
  <section className={style.careeropportunities}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className={globalStyle.pageHeader}>
            <h2>{props.title}</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className={`col-md-8 col-sm-7 ${style.careerdescription}`}>
          <Markdown
            source={props.description}
            escapeHtml
          />
        </div>

        <div className="col-md-4 col-sm-5">
          <div className="row">
            <div className="col-md-12">
              <a href={`/company/${props.companyId}`}>
                <picture>
                  <source srcSet={props.companyImage.lg} media="(max-width: 992px)" />
                  <img src={props.companyImage.md} width="100%" alt={props.companyName} />
                </picture>
              </a>
            </div>
          </div>

          <div className={style.company}>
            <a href={`/company/${props.companyId}`}>
              <div className="row">
                <div className="col-md-12">
                  <h3>{props.companyName}</h3>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className={style.companyIngress}>
                    <Markdown
                      source={props.companyDescription}
                      escapeHtml
                    />
                  </div>

                  <p className={`${globalStyle.pullRight} ${style.companyImageCaption}`}>Trykk for mer info</p>
                </div>
              </div>
            </a>
          </div>

          <div className={style.company}>
            <div className="row">
              <div className="col-md-12">
                <h3>Nøkkelinformasjon</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
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
