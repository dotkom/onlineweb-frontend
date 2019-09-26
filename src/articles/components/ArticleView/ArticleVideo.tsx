import React, { FC } from 'react';
import style from './articleView.less';

export interface IProps {
  vimeoId: string;
}

export const ArticleVideo: FC<IProps> = ({ vimeoId }) => (
  <div className={style.articleVideo}>
    <iframe src={`https://player.vimeo.com/video/${vimeoId}?byline=0&portrait=0`} allowFullScreen />
  </div>
);
