import React, { useEffect, useState } from 'react';

import Markdown from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';

import { getArticle } from 'articles/api';
import { mockArticle } from 'articles/models/Article';

import { ArticleHeader } from './ArticleHeader';
import { ArticleImage } from './ArticleImage';
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
      {article.video ? <ArticleVideo vimeoId={article.video} /> : <ArticleImage image={article.image} />}
      <article className={style.article}>
        <ArticleHeader article={article} />
        <Pane>
          <Markdown source={article.content} />
        </Pane>
      </article>
      <ArticleMeta article={article} />
      <RelatedArticles mainArticle={article} />
    </div>
  );
};
