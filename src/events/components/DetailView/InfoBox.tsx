import React from 'react';
import ReactMarkdown from 'react-markdown';
import { INewEvent } from '../../models/Event';
import style from './detail.less';

const InfoBox = ({ description, ingress }: INewEvent) => (
  <div className={style.infoBox}>
    <div className={style.cardMargin}>
      <p className={style.infoBoxHeader}>
        <ReactMarkdown source={ingress} />
      </p>

      <p className={style.infoBoxContent}>
        <ReactMarkdown source={description} />
      </p>
    </div>
  </div>
);

export default InfoBox;
