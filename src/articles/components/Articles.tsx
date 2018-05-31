import React from 'react';
import ArticlesHeading from './ArticlesHeading';
import MainArticle from './MainArticle';
import SmallArticle from './SmallArticle';
import { IArticle } from '../models/Article'

export interface IArticlesProps {
  mainArticles: IArticle[]
  smallArticles: IArticle[]
}

const Articles = ({ mainArticles, smallArticles }: IArticlesProps) => (
  <div>
    <ArticlesHeading />
    <div className="row row-space">
      {
        mainArticles.map((article, index: number) => (
          <MainArticle {...article} key={index} />
        ))
      }
      {
        smallArticles.map((article, index: number) => (
          <SmallArticle {...article} key={index} />
        ))
      }
    </div>
  </div>
);

export default Articles;
