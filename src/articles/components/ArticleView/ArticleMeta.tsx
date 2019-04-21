import { DateTime } from 'luxon';
import React from 'react';

import { IArticle } from 'articles/models/Article';

import style from './articleView.less';

export interface IProps {
  article: IArticle;
}

export const ArticleMeta = ({ article }: IProps) => {
  const { published_date, changed_date, authors, tags } = article;
  const pubDateTime = DateTime.fromISO(published_date);
  const changeDateTime = DateTime.fromISO(changed_date);

  return (
    <div className={style.bylineContainer}>
      <div className={style.byline}>
        <span>Publisert </span>
        <time dateTime={published_date}>{pubDateTime.toLocaleString()}</time>
        <span> Skrevet av </span>
        {authors}
        {published_date !== changed_date && pubDateTime < changeDateTime ? (
          <>
            <span className={style.lastChanged}>Sist endret </span>
            <time>{changeDateTime.toLocaleString()}</time>
          </>
        ) : null}
        <span>Tags </span>
        {tags.map((tag) => (
          <span className={style.tags}>{tag}</span>
        ))}
      </div>
    </div>
  );
};
