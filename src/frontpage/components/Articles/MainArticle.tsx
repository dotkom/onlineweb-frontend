import { IArticle } from 'articles/models/Article';
import ResponsiveImage from 'common/components/ResponsiveImage';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../articles/components/ArticlesRouter';
import style from './articles.less';

const MainArticle = ({ heading, image, ingress, id }: IArticle) => {
  return (
    <Link to={routes.detail.slice(0, -3) + id}>
      <div className={style.articleContainer}>
        <ResponsiveImage className={style.largeImage} image={image} size="sm" />
        <div>
          <h2>{heading}</h2>
          <p>{ingress}</p>
        </div>
      </div>
    </Link>
  );
};

export default MainArticle;
