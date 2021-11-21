import { NextPage, NextPageContext } from 'next';
import React from 'react';

import { fetchFrontPageArticles } from 'articles/slices/articles';
import { Store } from 'core/redux/Store';
import FrontPageComponent from 'frontpage';
import { getAllOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';

interface IContext extends NextPageContext {
  store: Store;
}

interface FrontPageProps {
  offlines: IOfflineIssue[];
}

const FrontPage: NextPage<FrontPageProps> = ({ offlines }) => {
  return <FrontPageComponent offlines={offlines} />;
};

export default FrontPage;

FrontPage.getInitialProps = async ({ store }: IContext) => {
  const state = store.getState();
  const isFrontPageArticlesPopulated = Boolean(state.articles.frontPageArticleIds.length);
  const articlesResult = store.dispatch(fetchFrontPageArticles());
  const offlines = await getAllOfflines();
  if (!isFrontPageArticlesPopulated) {
    await articlesResult;
  }
  return {
    offlines,
  };
};
