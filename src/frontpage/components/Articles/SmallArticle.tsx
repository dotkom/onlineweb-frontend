import React from 'react';
import { IArticle } from 'articles/models/Article';
import style from './articles.less';
import Img from 'common/components/Img';
import { DOMAIN } from 'common/constants/endpoints';

const SmallArticle = ({ absolute_url, heading, image }: IArticle) => {
  return (
    <a href={DOMAIN + absolute_url}>
      <div className={style.imageContainer}>
        <Img src={image.xs} />
        <p className={style.title}>{heading}</p>
      </div>
    </a>
  );
};

export default SmallArticle;
