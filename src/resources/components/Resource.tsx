import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';

import { IResource } from '../models/Resource';
import style from './resources.less';

export interface IProps {
  resource: IResource;
}

const Resource: FC<IProps> = ({ resource }) => {
  const { title, description, image } = resource;
  return (
    <div className={style.resource}>
      {image ? <ResponsiveImage image={image} /> : <img />}
      <div>
        <h3 className={style.resourceTitle}>{title}</h3>
        <Markdown source={description} />
      </div>
    </div>
  );
};

export default Resource;
