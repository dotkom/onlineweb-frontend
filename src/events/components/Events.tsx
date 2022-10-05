import React, { FC } from 'react';

import Heading from 'common/components/Heading';

import SearchModule from './SearchModule';
import { SearchResults } from './SearchModule/SearchResults';
import { Stats } from './SearchModule/Stats';
import { NextPageObserver } from './SearchModule/NextPageObserver';

const Events: FC = () => {
  return (
    <section>
      <Heading title="Arrangementer" />
      <SearchModule />
      <Stats />
      <SearchResults />
      <NextPageObserver />
    </section>
  );
};

export default Events;
