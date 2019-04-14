import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { IArticle } from '../../models/Article';
import style from './articleView.less';

export interface IProps {
  article: IArticle;
}

export const ArticleHeader: FC<IProps> = ({ article }) => {
  const { heading, ingress, published_date, changed_date, authors } = article;
  const pubDateTime = DateTime.fromISO(published_date);
  const changeDateTime = DateTime.fromISO(changed_date);

  return (
    <header className={style.articleHeader}>
      <h1>{heading}</h1>
      <hr />
      <p>{ingress}</p>
      <div className={style.byline}>
        <span>Publisert </span>
        <time dateTime={published_date}>{pubDateTime.toLocaleString()}</time> |<span> Skrevet av </span>
        {authors}
        {published_date !== changed_date && pubDateTime < changeDateTime ? (
          <>
            <span className={style.lastChanged}> | Sist endret </span>
            <time>{changeDateTime.toLocaleString()}</time>
          </>
        ) : null}
      </div>
    </header>
  );
};
