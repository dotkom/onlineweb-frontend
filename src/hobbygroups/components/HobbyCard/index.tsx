import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import { IHobbyGroup } from 'hobbygroups/models/HobbyGroup';

import style from './card.less';

export interface IProps {
  hobby: IHobbyGroup;
}

export const HobbyCard: FC<IProps> = ({ hobby }) => {
  return (
    <div className={style.hobbyCard}>
      <div className={style.imageContainer}>{hobby.image ? <img src={`${hobby.image.asset.url}`} /> : null}</div>
      <h2 className={style.title}>{hobby.title}</h2>
      <Markdown source={hobby.description} />
      <p className={style.linksContainer}>
        {hobby.read_more_link ? (
          <a href={hobby.read_more_link} className={style.link}>{`Les mer om ${hobby.title}`}</a>
        ) : null}
      </p>
    </div>
  );
};
