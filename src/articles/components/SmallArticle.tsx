import React from 'react';
import { IArticle } from '../models/Article'
import { DOMAIN } from 'common/constants/endpoints';

const SmallArticle = ({ articleUrl, heading, image }: IArticle) => (
  <div className="col-xs-6 col-md-2">
    <a href={DOMAIN + articleUrl}>
      <img src={DOMAIN + image.thumb} alt={heading} style={{ width: '100%' }}/>
      <br />
      <h4>{heading}</h4>
    </a>
  </div>
);

export default SmallArticle;
