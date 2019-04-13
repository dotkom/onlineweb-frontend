import React, { useEffect, useState } from 'react';
import { usePrefetch } from '../../common/hooks/usePrefetch';
import { PrefetchKey } from '../../common/utils/PrefetchState';
import { getArticle } from '../api';
import { mockArticle } from '../models/Article';

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
  }, []);

  return <p>Hello World: {article.heading}</p>;
};
