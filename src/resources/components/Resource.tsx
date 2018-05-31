import React, { Fragment } from 'react';
import { IResource } from '../models/Resource';
import ReactMarkdown from 'react-markdown';

const getImage = (resource: IResource) => {
  return resource.image ? { src: resource.image.url } : { alt: resource.title };
};

const Resource = (resource: IResource) => {
  const imageProps = getImage(resource);
    return (
    <div className="col-xs-12 col-sm-6 col-md-6">
      <div className="col-md-5">
        <img {...imageProps} />
      </div>
      <div className="col-md-7 resource-description">
        <h3>{resource.title}</h3>
        <span>
          <ReactMarkdown source={resource.description} />
        </span>
      </div>
    </div>
  )
}

export default Resource;
