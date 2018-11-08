import { getArticles } from 'articles/api';
import { IArticle } from 'articles/models/Article';
import Heading from 'common/components/Heading';
import { getStateCache } from 'common/utils/stateCacheResolver';
import React, { Component } from 'react';
import style from './articles.less';
import MainArticle from './MainArticle';
import SmallArticle from './SmallArticle';

export interface IProps {}

export interface IState {
  articles: IArticle[];
  index: number;
}

const DISPLAY_NUMBER = 3;

class Articles extends Component<IProps, IState> {
  public state: IState = {
    articles: getStateCache().articles,
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
      <section className={style.articles}>
        <Heading title="Artikler" />
        <div className={style.container}>
          {articles.length ? (
            <>
              <MainArticle {...articles[index]} />
              <div className={style.smallContainer}>
                {articles.slice(start, end).map((article) => (
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
