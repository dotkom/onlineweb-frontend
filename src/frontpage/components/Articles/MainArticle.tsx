import React from 'react';
import { IArticle } from 'articles/models/Article';
import style from './articles.less';
import Img from 'common/components/Img';
import { DOMAIN } from 'common/constants/endpoints';

const MainArticle = ({ absolute_url, heading, image, ingress_short }: IArticle) => {
  return (
    <div className={style.mainArticle}>
      <a href={DOMAIN + absolute_url}>
        <div className={style.imageContainer}>
          <Img src={image.lg} />
          <div>
            <p>{heading}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MainArticle;
