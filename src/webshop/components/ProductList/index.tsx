import React, { FC, useEffect } from 'react';

import Heading from 'common/components/Heading';
import { useDispatch } from 'core/redux/hooks';
import { fetchProducts } from 'webshop/slices/products';

import { ProductResults } from './ProductResults';

export const ProductList: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section>
      <Heading title="Produkter" />
      <ProductResults />
    </section>
  );
};
