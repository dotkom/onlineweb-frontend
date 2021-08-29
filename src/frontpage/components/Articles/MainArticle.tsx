import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import NextImage from 'next/image';
import { Link } from 'core/components/Router';
import cx from 'classnames';

import { Article } from './index';
import style from './articles.less';
import imageStyle from 'common/components/ResponsiveImage/ResponsiveImage.less';

interface IProps {
  article: Article;
}

const MainArticle: FC<IProps> = ({ article }) => {
  return article ? (
    <Link href={article.link} as={article.link}>
      <a>
        <div className={style.articleContainer}>
          <NextImage src={article.thumbnail.$.url} className={cx(style.smallImage, imageStyle.imageSize)} unsized />
          <div>
            <h2>{article.title}</h2>
            <div className={style.articleBody}>
              <Markdown source={article.summary} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  ) : null;
};

export default MainArticle;
