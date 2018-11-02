import React, { Component } from 'react';
import { getArticles } from 'articles/api';
import { IArticle } from 'articles/models/Article';
import Heading from '../Heading';
import MainArticle from './MainArticle';
import SmallArticle from './SmallArticle';
import style from './articles.less';

export interface IProps {}

export interface IState {
  articles: IArticle[];
  index: number;
}

const DISPLAY_NUMBER = 3;

class Articles extends Component<IProps, IState> {
  public state: IState = {
    articles: [],
    index: 0,
  };

  public async componentDidMount() {
    const articles = await getArticles();
    this.setState({ articles });
  }

  public render() {
    const { articles, index } = this.state;
    const start = index + 1;
    const end = start + DISPLAY_NUMBER;
    return (
      <section>
        <Heading title="artikler" />
        <div className={style.container}>
          {articles.length ? (
            <>
              <MainArticle {...articles[index]} />
              <div className={style.smallContainer}>
                {articles.slice(start, end).map((article, i) => (
                  <SmallArticle key={article.absolute_url} {...article} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Articles;
