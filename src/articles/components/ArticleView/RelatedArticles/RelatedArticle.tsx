import ResponsiveImage from 'common/components/ResponsiveImage/index';
import IResponsiveImage from 'common/models/ResponsiveImage';
import { Link } from 'core/components/Router/Link';
import React, { FC } from 'react';

import style from './relatedArticle.less';

export interface IProps {
  id: number;
  image: IResponsiveImage;
  heading: string;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const RelatedArticle: FC<IProps> = ({ id, heading, image, scrollRef }) => (
  <section key={id} className={style.relatedArticle} ref={scrollRef}>
    <Link href={`/articles/${id}`}>
      <a>
        <ResponsiveImage className={style.relatedArticleImage} image={image} size="md" type="article" />
        <h3 className={style.relatedArticleHeading}>{heading}</h3>
      </a>
    </Link>
  </section>
);
