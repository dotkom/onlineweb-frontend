import React from 'react';
import { INewEvent } from '../../models/Event';
import style from './detail.less';

const InfoBox = ({ description, ingress }: INewEvent) => (
  <div className={style.infoBox}>
    <div className={style.cardMargin}>
      <p className={style.infoBoxHeader}>{ingress}</p>
      <p>{description}</p>
    </div>
  </div>
);

export default InfoBox;
