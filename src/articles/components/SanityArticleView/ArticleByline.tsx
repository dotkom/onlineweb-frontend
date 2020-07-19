import { DateTime } from 'luxon';
import React from 'react';

import style from './articleView.less';

export interface IProps {
  published_date: string,
  authors: string[]
}

export const ArticleByline = ({ published_date, authors }: IProps) => {
  const pubDateTime = DateTime.fromISO(published_date);
  return (
    <div className={style.bylineContainer}>
      <div className={style.byline}>
        <div className={style.bylineItem}>
          <span>Skrevet av </span>
          <p>{authors}</p>
        </div>
        <div className={style.bylineItem}>
          <span>Publisert </span>
          <time dateTime={published_date}>{pubDateTime.toLocaleString()}</time>
        </div>
      </div>
    </div>
  );
};
