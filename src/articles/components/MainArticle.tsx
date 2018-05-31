import React from 'react';

import { IArticle } from '../models/Article'
import { DOMAIN } from 'common/constants/endpoints';

const MainArticle = ({ articleUrl, heading, image, ingress }: IArticle) => (
  <div className="col-md-6">
    <a href={DOMAIN + articleUrl}>
      <img src={DOMAIN + image.sm} alt={heading} style={{ width: '100%' }}/>
      <h3>{heading}</h3>
    </a>
    <p>{ingress}</p>
  </div>
);

export default MainArticle;
