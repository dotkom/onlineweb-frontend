import React from 'react';
import { IArticle } from 'articles/models/Article';
import style from './articles.less';
import Img from 'common/components/Img';
import { DOMAIN } from 'common/constants/endpoints';

const MainArticle = ({ absolute_url, heading, image, ingress_short }: IArticle) => {
  return (
    <a href={DOMAIN + absolute_url}>
      <div className={style.imageContainer}>
        <Img src={image.lg} />
        <h2 className={style.title}>{heading}</h2>
      </div>
    </a>
  );
};

export default MainArticle;
