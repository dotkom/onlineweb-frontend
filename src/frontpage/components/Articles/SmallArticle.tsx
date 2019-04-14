import { IArticle } from 'articles/models/Article';
import classnames from 'classnames';
import ResponsiveImage from 'common/components/ResponsiveImage';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../articles/components/ArticlesRouter';
import style from './articles.less';

const SmallArticle = ({ heading, image, ingress_short, id }: IArticle) => {
  return (
    <Link to={routes.detail.slice(0, -3) + id}>
      <div className={classnames(style.articleContainer, style.smallArticle)}>
        <ResponsiveImage image={image} size="xs" className={style.smallImage} />
        <div>
          <h2>{heading}</h2>
          <p>{ingress_short}</p>
        </div>
      </div>
    </Link>
  );
};

export default SmallArticle;
