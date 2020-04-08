import React, { FC, useEffect } from 'react';

import { articleSelectors, fetchRelatedArticles } from 'articles/slices/articles';
import { Carousel } from 'common/components/Carousel';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import style from '../articleView.less';
import { RelatedArticle } from './RelatedArticle';

interface IProps {
  relatedToArticleId: number;
}

export const RelatedArticles: FC<IProps> = ({ relatedToArticleId }) => {
  const dispatch = useDispatch();
  const articles = useSelector(selectRelatedArticles(relatedToArticleId));

  useEffect(() => {
    dispatch(fetchRelatedArticles(relatedToArticleId));
  }, [relatedToArticleId, dispatch]);

  return (
    <>
      {articles.length > 0 && (
        <aside className={style.relatedArticles}>
          <Carousel values={articles} title="Relaterte artikler">
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
      )}
    </>
  );
};

const selectRelatedArticles = (relatedToId: number) => (state: State) => {
  const mainArticle = articleSelectors.selectById(state, relatedToId);
  const allArticles = articleSelectors.selectAll(state);
  if (mainArticle) {
    const relatedArticles = allArticles.filter((article) => {
      return article.id !== relatedToId && article.tags.some((articleTag) => mainArticle.tags.includes(articleTag));
    });
    return relatedArticles;
  }
  return [];
};
