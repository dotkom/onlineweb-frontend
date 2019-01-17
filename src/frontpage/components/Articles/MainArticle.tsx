import { IArticle } from 'articles/models/Article';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { DOMAIN } from 'common/constants/endpoints';
import React from 'react';
import style from './articles.less';

const MainArticle = ({ absolute_url, heading, image, ingress }: IArticle) => {
  return (
    <a href={DOMAIN + absolute_url}>
      <div className={style.articleContainer}>
        <ResponsiveImage image={image} size="sm" />
        <div>
          <h2>{heading}</h2>
          <p>{ingress}</p>
        </div>
      </div>
    </a>
  );
};

export default MainArticle;
