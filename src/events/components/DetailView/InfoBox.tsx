import Markdown from 'common/components/Markdown';
import React from 'react';
import { INewEvent } from '../../models/Event';
import style from './detail.less';

const InfoBox = ({ description, ingress, title }: INewEvent) => (
  <div className={style.infoBox}>
    <h1 className={style.title}>{title}</h1>
    <Markdown className={style.infoBoxHeader} source={ingress} />
    <Markdown className={style.infoBoxContent} source={description} />
  </div>
);

export default InfoBox;
