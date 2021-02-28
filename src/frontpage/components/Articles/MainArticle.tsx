import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';

import { articleSelectors } from 'articles/slices/articles';
import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { getArticleUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';

import style from './articles.less';

interface IProps {
  articleId: number;
}

const MainArticle: FC<IProps> = ({ articleId }) => {
  const article = useSelector((state) => articleSelectors.selectById(state, articleId), shallowEqual);

  return article ? (
    <Link {...getArticleUrl(articleId)}>
      <a>
        <div className={style.articleContainer}>
          <ResponsiveImage image={article.image} />
          <div>
            <h2>{article.heading}</h2>
            <div className={style.articleBody}>
              <Markdown source={article.ingress.replace(/#[^\s#]/g, (match) => `# ${match.slice(-1)}`)} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  ) : null;
};

export default MainArticle;
