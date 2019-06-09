import React from 'react';

import { routes } from 'articles/components/ArticlesRouter';
import { IArticle } from 'articles/models/Article';
import Markdown from 'common/components/Markdown/index';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { Link } from 'core/components/Router';

import style from './articles.less';

const MainArticle = ({ heading, image, ingress, id }: IArticle) => {
  return (
    <Link to={routes.detail + id}>
      <div className={style.articleContainer}>
        <ResponsiveImage className={style.largeImage} image={image} size="sm" type="article" />
        <div>
          <h2>{heading}</h2>
          <Markdown source={ingress.replace(/#[^\s#]/g, (match) => `# ${match.slice(-1)}`)} />
        </div>
      </div>
    </Link>
  );
};

export default MainArticle;
