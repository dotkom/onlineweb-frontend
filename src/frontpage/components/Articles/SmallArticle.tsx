import classnames from 'classnames';
import React from 'react';

import { IArticle } from 'articles/models/Article';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { getArticleUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './articles.less';

const SmallArticle = ({ heading, image, ingress_short, id }: IArticle) => {
  return (
    <Link {...getArticleUrl(id)}>
      <a>
        <div className={classnames(style.articleContainer, style.smallArticle)}>
          <ResponsiveImage image={image} size="xs" className={style.smallImage} type="article" />
          <div>
            <h2>{heading}</h2>
            <p>{ingress_short}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SmallArticle;
