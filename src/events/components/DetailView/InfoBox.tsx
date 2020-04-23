import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';

import { IEvent } from '../../models/Event';
import style from './detail.less';

interface IProps {
  event: IEvent;
}

const InfoBox: FC<IProps> = ({ event }) => {
  const { description, ingress, title } = event;
  return (
    <div className={style.infoBox}>
      <h1 className={style.title}>{title}</h1>
      <Markdown className={style.infoBoxHeader} source={ingress} />
      <Markdown className={style.infoBoxContent} source={description} />
    </div>
  );
};

export default InfoBox;
