import React, { Component, createContext } from 'react';

import { getArticles } from '../api';
import { IArticle } from '../models/Article';

export interface IFrontpageArticlesState {
  articles: IArticle[];
  init: () => void;
}

const INITIAL_STATE: IFrontpageArticlesState = {
  articles: [],
  init: async () => {
    throw new Error('Init state was called before component was initialized');
  },
};

export const FrontpageArticleContext = createContext(INITIAL_STATE);

class FrontpageArticles extends Component<{}, IFrontpageArticlesState> {
  public state = INITIAL_STATE;

  public init = async () => this.getArticles();

  public async getArticles() {
    const articles = await getArticles();
    this.setState({ articles });
  }

  public render() {
    const { init } = this;
    const value = { ...this.state, init };
    return <FrontpageArticleContext.Provider value={value}>{this.props.children}</FrontpageArticleContext.Provider>;
  }
}

export default FrontpageArticles;
