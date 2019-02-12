import React, { Component, createContext } from 'react';

import { prefetch } from 'common/utils/prefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';

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

export interface IProps {
  /** Cache from SSR */
  prefetch?: IArticle[];
}

export const FrontpageArticleContext = createContext(INITIAL_STATE);

@prefetch(PrefetchKey.ARTICLES)
class FrontpageArticles extends Component<IProps, IFrontpageArticlesState> {
  public static async getServerState(_: IProps): Promise<IArticle[]> {
    const articles = await getArticles();
    return articles;
  }

  constructor(props: IProps) {
    super(props);

    /** If there is a cache from SSR, set it to state */
    this.state = { ...INITIAL_STATE, articles: props.prefetch || [] };
  }

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
