import React, { FC, useEffect, useState } from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import { Link } from 'core/components/Router';

import { getArticles } from 'articles/api';
import { routes } from 'articles/components/ArticlesRouter';
import { IArticle } from 'articles/models/Article';

import style from '../articleView.less';

export interface IProps {
  mainArticle: IArticle;
}

export const RelatedArticles: FC<IProps> = ({ mainArticle }) => {
  const [relatedArticles, setRelatedArticles] = useState<IArticle[]>([]);

  const updateRelatedArticleList = (articles: IArticle[]) => {
    const oldArticles = relatedArticles.filter((oldArticle) => {
      const newArticleIds = articles.map((article) => article.id);
      return !newArticleIds.includes(oldArticle.id);
    });

    const allArticles = oldArticles
      .concat(articles)
      .filter((article) => article.tags.some((articleTag) => mainArticle.tags.includes(articleTag)));

    return allArticles
      .filter((article, idx, final) => final.map((e) => e.id).indexOf(article.id) === idx)
      .sort((a, b) => Date.parse(b.published_date) - Date.parse(a.published_date))
      .filter((article) => article.id !== mainArticle.id);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const relatedArticlePromises = mainArticle.tags.map(async (tag) => getArticles({ tags: tag }));
      const newRelatedArticles = await Promise.all(relatedArticlePromises);
      const updatedRelatedArticleList = updateRelatedArticleList(newRelatedArticles.flat());
      setRelatedArticles(updatedRelatedArticleList);
    };
    if (mainArticle.tags.length !== 0) {
      fetchArticles();
    }
  }, [mainArticle]);

  return (
    <aside className={style.relatedArticles}>
      {relatedArticles.map((article) => (
        <section key={article.id} className={style.relatedArticle}>
          <Link to={routes.detail + article.id}>
            <ResponsiveImage className={style.relatedArticleImage} image={article.image} size="md" />
            <h3 className={style.relatedArticleHeading}>{article.heading}</h3>
          </Link>
        </section>
      ))}
    </aside>
  );
};
