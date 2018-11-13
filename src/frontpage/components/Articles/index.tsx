import { FrontpageArticleContext, IFrontpageArticlesState } from 'articles/providers/FrontpageArticles';
import Heading from 'common/components/Heading';
import React, { Component } from 'react';
import style from './articles.less';
import MainArticle from './MainArticle';
import SmallArticle from './SmallArticle';

export interface IProps {}

export interface IState {
  index: number;
}

const DISPLAY_NUMBER = 3;

class Articles extends Component<IProps, IState> {
  public static contextType = FrontpageArticleContext;
  public state: IState = {
    index: 0,
  };

  public async componentDidMount() {
    const { init }: IFrontpageArticlesState = this.context;
    init();
  }

  public render() {
    const { index } = this.state;
    const { articles }: IFrontpageArticlesState = this.context;
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
