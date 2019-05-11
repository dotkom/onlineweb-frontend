import React, { FC } from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import IResponsiveImage from '../../../common/models/ResponsiveImage';

import style from './articleView.less';

export interface IProps {
  image: IResponsiveImage;
}

export const ArticleImage: FC<IProps> = ({ image }) => (
  <section className={style.articleImage}>
    <ResponsiveImage image={image} size="lg" type="article" />
    {image.photographer ? (
      <div>
        <span>Fotograf</span> {image.photographer}
      </div>
    ) : null}
  </section>
);
