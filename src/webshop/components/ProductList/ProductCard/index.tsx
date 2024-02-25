import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { getCompanyUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { productSelectors } from 'webshop/slices/products';
import { IProduct } from 'webshop/models';

import style from './ProductCard.less';

interface IProps {
  productId: number;
}

export const ProductCard: FC<IProps> = ({ productId }) => {
  const product = useSelector(selectProductById(productId));
  return (
    <Link {...getCompanyUrl(productId)}>
      <a className={style.cproductCard}>
        <div className={style.imageContainer}>
          <ResponsiveImage image={product.images[0]} size="sm" type="product" />
        </div>
        <h2 className={style.title}>{product.name}</h2>
        <Markdown source={product.short} />
        <div className={style.detailsContainer}>
          <p className={style.price}>Pris: {product.price} kr</p>
        </div>
      </a>
    </Link>
  );
};

const selectProductById = (productId: number) => (state: State) => {
  return productSelectors.selectById(state, productId) as IProduct;
};
