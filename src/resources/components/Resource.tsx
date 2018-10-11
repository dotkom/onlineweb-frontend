import React, { Fragment } from 'react';
import { IResource } from '../models/Resource';
import ReactMarkdown from 'react-markdown';
import style from './resources.less';

const Resource = ({ title, description, image }: IResource) => {
  return (
    <div className={style.resource}>
      <img src={image} alt={title} />
      <span>
        <h3>{title}</h3>
        <ReactMarkdown source={description} />
      </span>
    </div>
  )
}

export default Resource;
