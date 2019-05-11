import React, { FC, useEffect, useState } from 'react';

import { Carousel } from 'common/components/Carousel';

import { getArticles } from 'articles/api';
import { IArticle } from 'articles/models/Article';

import style from '../articleView.less';
import { RelatedArticle } from './RelatedArticle';

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
      <Carousel values={relatedArticles} title="Relaterte artikler">
        {(relatedArticlesRef) => (
          <>
            {relatedArticlesRef.map((article) => (
              <RelatedArticle
                key={article.value.id}
                id={article.value.id}
                image={article.value.image}
                heading={article.value.heading}
                scrollRef={article.ref}
              />
            ))}
          </>
        )}
      </Carousel>
    </aside>
  );
};
