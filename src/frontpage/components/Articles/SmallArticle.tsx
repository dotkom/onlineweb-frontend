import { IArticle } from 'articles/models/Article';
import classnames from 'classnames';
import Img from 'common/components/Img';
import { DOMAIN } from 'common/constants/endpoints';
import React from 'react';
import style from './articles.less';

const SmallArticle = ({ absolute_url, heading, image, ingress_short }: IArticle) => {
  return (
    <a href={DOMAIN + absolute_url}>
      <div className={classnames(style.articleContainer, style.smallArticle)}>
        <Img src={image.xs} className={style.smallImage}/>
        <div>
          <h2>{heading}</h2>
          <p>{ingress_short}</p>
        </div>
      </div>
    </a>
  );
};

export default SmallArticle;
