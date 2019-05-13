import React, { useEffect, useState } from 'react';

import Markdown from 'common/components/Markdown';
import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';

import { getArticle } from 'articles/api';
import { mockArticle } from 'articles/models/Article';
import ResponsiveImage from 'common/components/ResponsiveImage/index';

import { ArticleByline } from './ArticleByline';
import { ArticleMeta } from './ArticleMeta';
import { ArticleVideo } from './ArticleVideo';
import style from './articleView.less';
import { RelatedArticles } from './RelatedArticles';

export interface IProps {
  articleId: number;
}

export const ArticleView = ({ articleId }: IProps) => {
  const prefetchArticle = usePrefetch(PrefetchKey.ARTICLE_SINGLE, async () => await getArticle(articleId));
  const defaultArticle = prefetchArticle && prefetchArticle.id === articleId ? prefetchArticle : mockArticle;

  const [article, setArticle] = useState(defaultArticle);

  useEffect(() => {
    const fetchArticle = async () => {
      const newArticle = await getArticle(articleId);

      setArticle(newArticle);
    };
    fetchArticle();
  }, [articleId]);

  return (
    <div className={style.container}>
      <article className={style.article}>
        {article.video ? (
          <ArticleVideo vimeoId={article.video} />
        ) : (
          <ResponsiveImage image={article.image} size="lg" type="article" />
        )}
        <header className={style.articleHeader}>
          <h1>{article.heading}</h1>
        </header>
        <div className={style.ingress}>
          <hr />
          <p>{article.ingress}</p>
        </div>
        <ArticleByline article={article} />
        <Markdown
          className={style.articleText}
          source={article.content.replace(/#[^\s#]/g, (match) => `# ${match.slice(-1)}`)}
        />
        <ArticleMeta article={article} />
      </article>
      <RelatedArticles mainArticle={article} />
    </div>
  );
};
