import React, { Component } from 'react';
import Articles from '../components/Articles';
import { IArticle } from '../models/Article';
import { getArticles } from '../api';

const apiArticlesToArticles = (article: IArticle) => ({
  articleUrl: article.absolute_url,
  ingress: article.ingress_short,
  heading: article.heading,
  image: article.image,
});

export interface IArticlesContainerProps {
}

export interface IArticlesContainerState {
  articles: IArticle[];
}

class ArticlesContainer extends Component<IArticlesContainerProps, IArticlesContainerState> {
  public API_URL: string;
  constructor(props: IArticlesContainerProps) {
    super(props);
    this.API_URL = '/api/v1/articles';
    this.state = {
      articles: [],
    };
    this.fetchArticles();
  }

  public async fetchArticles() {
    const { results } = await getArticles();
    const articles = results.map(apiArticlesToArticles);
    this.setState({ articles });
  }

  public mainArticles() {
    return this.state.articles.slice(0, 2);
  }

  public smallArticles() {
    return this.state.articles.slice(2, 8);
  }

  public render() {
    return (
      <Articles
        mainArticles={this.mainArticles()} smallArticles={this.smallArticles()}
      />
    );
  }
}

export default ArticlesContainer;
