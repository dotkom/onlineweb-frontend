import React, { useEffect, useState } from 'react';
import Markdown from '../../../common/components/Markdown';
import { usePrefetch } from '../../../common/hooks/usePrefetch';
import { PrefetchKey } from '../../../common/utils/PrefetchState';
import { getArticle } from '../../api';
import { mockArticle } from '../../models/Article';
import { ArticleHeader } from './ArticleHeader';
import { ArticleImage } from './ArticleImage';
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
      <ArticleImage image={article.image} />
      <article className={style.article}>
        <ArticleHeader article={article} />
        <section className={style.articleText}>
          <Markdown source={article.content} />
        </section>
      </article>
      <RelatedArticles mainArticle={article} />
    </div>
  );
};
