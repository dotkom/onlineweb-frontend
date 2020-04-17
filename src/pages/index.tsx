import { NextPage, NextPageContext } from 'next';
import React from 'react';

import { fetchFrontPageArticles } from 'articles/slices/articles';
import { Store } from 'core/redux/Store';
import FrontPageComponent from 'frontpage';

interface IContext extends NextPageContext {
  store: Store;
}

const FrontPage: NextPage = () => {
  return <FrontPageComponent />;
};

export default FrontPage;

FrontPage.getInitialProps = async ({ store }: IContext) => {
  const state = store.getState();
  const isFrontPageArticlesPopulated = Boolean(state.articles.frontPageArticleIds.length);
  const articlesResult = store.dispatch(fetchFrontPageArticles());
  if (!isFrontPageArticlesPopulated) {
    await articlesResult;
  }
  return {};
};
