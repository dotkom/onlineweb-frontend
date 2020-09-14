import React, { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import { fetchFrontPageArticles } from 'articles/slices/articles';
import Heading from 'common/components/Heading';
import { useDispatch, useSelector } from 'core/redux/hooks';

import style from './articles.less';
import MainArticle from './MainArticle';
import SmallArticle from './SmallArticle';

const Articles = () => {
  const dispatch = useDispatch();
  const articleIds = useSelector((state) => state.articles.frontPageArticleIds, shallowEqual);

  useEffect(() => {
    dispatch(fetchFrontPageArticles());
  }, []);

  return (
    <section className={style.articles}>
      <Heading title="Artikler" />
      <div className={style.container}>
        {articleIds.length ? (
          <>
            <MainArticle articleId={articleIds[0]} />
            <span className={style.smallContainer}>
              {articleIds.slice(1, 4).map((articleId) => (
                <SmallArticle key={articleId} articleId={articleId} />
              ))}
            </span>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Articles;
