import { IArticle } from 'articles/models/Article';
import ResponsiveImage from 'common/components/ResponsiveImage';
import React from 'react';
import style from './articles.less';

const MainArticle = ({ heading, image, ingress, id }: IArticle) => {
  return (
    <a href={'articles/' + id}>
      <div className={style.articleContainer}>
        <ResponsiveImage className={style.largeImage} image={image} size="sm" />
        <div>
          <h2>{heading}</h2>
          <p>{ingress}</p>
        </div>
      </div>
    </a>
  );
};

export default MainArticle;
