import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import { IHobbyGroup } from 'hobbygroups/models/HobbyGroup';

import style from './card.less';
import { Divider } from './Divider';
import { Image } from './Image';
import { Links, ReadMore } from './Links';
import { Title } from './Title';

export interface IProps {
  hobby: IHobbyGroup;
}

export const HobbyCard: FC<IProps> = ({ hobby }) => {
  return (
    <div className={style.hobbyCard}>
      <Image image={hobby.image} />
      <Title>{hobby.title}</Title>
      <Divider />
      <Markdown source={hobby.description} />
      <Divider />
      <Links>
        <ReadMore link={hobby.read_more_link}>{`Les mer om ${hobby.title}`}</ReadMore>
      </Links>
    </div>
  );
};
