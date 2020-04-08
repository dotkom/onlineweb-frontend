import classnames from 'classnames';
import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';

import { articleSelectors } from 'articles/slices/articles';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { getArticleUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';

import style from './articles.less';

interface IProps {
  articleId: number;
}

const SmallArticle: FC<IProps> = ({ articleId }) => {
  const article = useSelector((state) => articleSelectors.selectById(state, articleId), shallowEqual);
  return article ? (
    <Link {...getArticleUrl(articleId)}>
      <a>
        <div className={classnames(style.articleContainer, style.smallArticle)}>
          <ResponsiveImage image={article.image} size="xs" className={style.smallImage} type="article" />
          <div>
            <h2>{article.heading}</h2>
            <p>{article.ingress_short}</p>
          </div>
        </div>
      </a>
    </Link>
  ) : null;
};

export default SmallArticle;
