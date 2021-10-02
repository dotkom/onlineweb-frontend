import classnames from 'classnames';
import React, { FC } from 'react';

import NextImage from 'next/image';
import { Link } from 'core/components/Router';
import cx from 'classnames';

import { Article } from './index';
import style from './articles.less';
import imageStyle from 'common/components/ResponsiveImage/ResponsiveImage.less';

interface IProps {
  article: Article;
}

const SmallArticle: FC<IProps> = ({ article }) => {
  return article ? (
    <Link href={article.link} as={article.link}>
      <a>
        <div className={classnames(style.articleContainer, style.smallArticle)}>
          <NextImage src={article.thumbnail.$.url} className={cx(style.smallImage, imageStyle.imageSize)} unsized />
          <div>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
          </div>
        </div>
      </a>
    </Link>
  ) : null;
};

export default SmallArticle;
