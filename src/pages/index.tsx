import { NextPage } from 'next';
import React from 'react';

import { fetchFrontPageArticles } from 'articles/slices/articles';
import { wrapper } from 'core/redux/Store';
import FrontPageComponent from 'frontpage';

const FrontPage: NextPage = () => {
  return <FrontPageComponent />;
};

export default FrontPage;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const state = store.getState();
  const isFrontPageArticlesPopulated = Boolean(state.articles.frontPageArticleIds.length);
  const articlesResult = store.dispatch(fetchFrontPageArticles());
  if (!isFrontPageArticlesPopulated) {
    await articlesResult;
  }
  return {};
});
