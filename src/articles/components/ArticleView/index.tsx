import React, { useEffect, useState } from 'react';

import Markdown from 'common/components/Markdown';
import { DOMAIN } from 'common/constants/endpoints';
import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';

import { getArticle } from 'articles/api';
import { mockArticle } from 'articles/models/Article';
import ResponsiveImage from 'common/components/ResponsiveImage/index';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <meta property="og:title" content={article.heading} />
        <meta property="og:description" content={article.ingress_short} />
        <meta property="og:image" content={article.image ? DOMAIN + article.image.thumb : undefined} />
        <meta property="og:article:published_time" content={article.published_date} />
        <meta property="og:article:modified_time" content={article.changed_date} />
        <meta property="og:article:author" content={article.authors} />
        {article.tags.map((tag) => (
          <meta property="og:article:tag" content={tag} key={tag} />
        ))}
      </Helmet>

      <article className={style.article}>
        {article.video ? (
          <ArticleVideo vimeoId={article.video} />
        ) : (
          <ResponsiveImage image={article.image} size="lg" type="article" />
        )}
        <ArticleByline article={article} />
        <div className={style.articleMain}>
          <header className={style.articleHeader}>
            <h1>{article.heading}</h1>
          </header>
          <div className={style.ingress}>
            <hr />
            <Markdown source={article.ingress.replace(/#[^\s#]/g, (match) => `# ${match.slice(-1)}`)} />
          </div>

          <Markdown
            className={style.articleText}
            source={article.content.replace(/#[^\s#]/g, (match) => `# ${match.slice(-1)}`)}
          />
        </div>

        <ArticleMeta article={article} />
      </article>

      <RelatedArticles mainArticle={article} />
    </div>
  );
};
