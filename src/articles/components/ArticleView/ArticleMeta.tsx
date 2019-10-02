import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { IArticle } from 'articles/models/Article';

import style from './articleView.less';

export interface IProps {
  article: IArticle;
}

export const ArticleMeta: FC<IProps> = ({ article }) => {
  const { published_date, changed_date, tags } = article;
  const pubDateTime = DateTime.fromISO(published_date);
  const changeDateTime = DateTime.fromISO(changed_date);

  return (
    <div className={style.articleMeta}>
      {published_date !== changed_date && pubDateTime < changeDateTime && (
        <div>
          <span className={style.lastChanged}>Sist endret </span>
          <time>{changeDateTime.toLocaleString()}</time>
        </div>
      )}
      <div>
        <span>Tags </span>
        {tags.map((tag) => (
          <span className={style.tags} key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
