import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';

import style from '../less/hobbygroups.less';
import { IHobbyGroup } from '../models/HobbyGroup';

export interface IProps {
  hobby: IHobbyGroup;
}

const HobbyGroup: FC<IProps> = ({ hobby }) => {
  const { title, description, image } = hobby;
  return (
    <div className={style.hobby}>
      {image ? <ResponsiveImage image={image} type="hobby" size="sm" /> : <img />}
      <div>
        <h3 className={style.hobbyTitle}>{title}</h3>
        <Markdown source={description} />
      </div>
    </div>
  );
};

export default HobbyGroup;
