import { NextPage, NextPageContext } from 'next';
import React from 'react';

import { ArticleView } from 'articles/components/ArticleView';
import { articleSelectors, fetchArticleById } from 'articles/slices/articles';
import { Store } from 'core/redux/Store';

interface IContext extends NextPageContext {
  store: Store;
}

interface IProps {
  articleId: number;
}

const ArticleDetailPage: NextPage<IProps> = ({ articleId }) => {
  return <ArticleView articleId={articleId} />;
};

ArticleDetailPage.getInitialProps = async ({ query, store }: IContext) => {
  const articleId = Number(query.articleId);
  const isArticleInStore = Boolean(articleSelectors.selectById(store.getState(), articleId));
  const result = store.dispatch(fetchArticleById(articleId));
  if (!isArticleInStore) {
    await result;
  }
  return { articleId };
};

export default ArticleDetailPage;
