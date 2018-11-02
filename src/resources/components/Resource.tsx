import React, { Fragment } from 'react';
import { IResource } from '../models/Resource';
import ReactMarkdown from 'react-markdown';
import style from './resources.less';

const Resource = ({ title, description, image }: IResource) => {
  return (
    <div className={style.resource}>
      <img src={image} alt={title} />
      <div>
        <h3 className={style.resourceTitle}>{title}</h3>
        <ReactMarkdown source={description} />
      </div>
    </div>
  );
};

export default Resource;
