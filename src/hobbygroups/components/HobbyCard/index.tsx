import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { IHobbyGroup } from 'hobbygroups/models/HobbyGroup';

import style from './card.less';

export interface IProps {
  hobby: IHobbyGroup;
}

export const HobbyCard: FC<IProps> = ({ hobby }) => {
  return (
    <div className={style.hobbyCard}>
      <div className={style.imageContainer}>{hobby.image ? <ResponsiveImage image={hobby.image} /> : null}</div>
      <h2 className={style.title}>{hobby.title}</h2>
      <Markdown source={hobby.description} />
      <p className={style.linksContainer}>
        <a href={hobby.read_more_link} className={style.link}>{`Les mer om ${hobby.title}`}</a>
      </p>
    </div>
  );
};
