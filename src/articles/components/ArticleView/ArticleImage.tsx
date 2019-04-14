import React, { FC } from 'react';
import { DOMAIN } from '../../../common/constants/endpoints';
import IImage from '../../../common/models/Image';
import style from './articleView.less';

export interface IProps {
  image: IImage;
}

export const ArticleImage: FC<IProps> = ({ image }) => (
  <section className={style.articleimage}>
    <img alt={image.description} src={DOMAIN + image.original} />
    <div>
      <span>Fotograf</span> {image.photographer}
    </div>
  </section>
);
