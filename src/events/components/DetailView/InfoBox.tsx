import React from 'react';
import ReactMarkdown from 'react-markdown';
import { INewEvent } from '../../models/Event';
import style from './detail.less';

const InfoBox = ({ description, ingress }: INewEvent) => (
  <div className={style.infoBox}>
    <div className={style.cardMargin}>
      <ReactMarkdown className={style.infoBoxHeader} source={ingress} />
      <ReactMarkdown className={style.infoBoxContent} source={description} />
    </div>
  </div>
);

export default InfoBox;
