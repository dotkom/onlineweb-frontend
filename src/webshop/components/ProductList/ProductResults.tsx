import React from 'react';
import { shallowEqual } from 'react-redux';

import { State } from 'core/redux/Store';
import { useSelector } from 'core/redux/hooks';
import { productSelectors } from 'webshop/slices/products';

import { ProductCard } from './ProductCard';
import style from './ProductResults.less';

export const ProductResults = () => {
  const productIds = useSelector(selectProducts(), shallowEqual);
  return (
    <div className={style.productsContainer}>
      {productIds.map((productId) => (
        <ProductCard key={productId} productId={productId} />
      ))}
    </div>
  );
};

const selectProducts = () => (state: State) => {
  return productSelectors.selectIds(state).map(Number);
};
