import { IArticle } from 'articles/models/Article';
import classnames from 'classnames';
import ResponsiveImage from 'common/components/ResponsiveImage';
import React from 'react';
import style from './articles.less';

const SmallArticle = ({ heading, image, ingress_short, id }: IArticle) => {
  return (
    <a href={'articles/' + id}>
      <div className={classnames(style.articleContainer, style.smallArticle)}>
        <ResponsiveImage image={image} size="xs" className={style.smallImage} />
        <div>
          <h2>{heading}</h2>
          <p>{ingress_short}</p>
        </div>
      </div>
    </a>
  );
};

export default SmallArticle;
