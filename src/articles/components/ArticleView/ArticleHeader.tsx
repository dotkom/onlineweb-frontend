import React, { FC } from 'react';

import { IArticle } from 'articles/models/Article';
import style from './articleView.less';

export interface IProps {
  article: IArticle;
}

export const ArticleHeader: FC<IProps> = ({ article }) => {
  const { heading, ingress } = article;

  return (
    <header className={style.articleHeader}>
      <h1>{heading}</h1>
      <hr />
      <p>{ingress}</p>
    </header>
  );
};
