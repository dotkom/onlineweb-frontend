import Head from 'next/head';
import { ArticleByline } from './ArticleByline';
import { ArticleMeta } from './ArticleMeta';
import { ArticleVideo } from './ArticleVideo';
import { RelatedArticles } from './RelatedArticles';
import { articleSelectors, fetchArticleById } from 'articles/slices/articles';
import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import Spinner from 'common/components/Spinner';
import { DOMAIN } from 'common/constants/endpoints';
import { useDispatch, useSelector } from 'core/redux/hooks';
import NotFoundPage from 'pages/404';
import React, { useEffect } from 'react';
import style from './articleView.less';

export interface IProps {
  articleId: number;
}

export const ArticleView = ({ articleId }: IProps) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => articleSelectors.selectById(state, articleId));
  const isPending = useSelector((state) => state.articles.loading === 'pending');

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [articleId, dispatch]);

  if (isPending && !article) {
    return <Spinner />;
  }

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <div className={style.container}>
      <Head>
        <meta property="og:title" content={article.heading} />
        <meta property="og:description" content={article.ingress_short} />
        <meta property="og:image" content={article.image ? DOMAIN + article.image.thumb : undefined} />
        <meta property="og:article:published_time" content={article.published_date} />
        <meta property="og:article:modified_time" content={article.changed_date} />
        <meta property="og:article:author" content={article.authors} />
        {article.tags.map((tag) => (
          <meta property="og:article:tag" content={tag} key={tag} />
        ))}
      </Head>
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
      <RelatedArticles relatedToArticleId={articleId} />
    </div>
  );
};
