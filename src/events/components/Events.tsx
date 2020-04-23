import React, { FC } from 'react';

import Heading from 'common/components/Heading';

import SearchModule from './SearchModule';
import { SearchResults } from './SearchModule/SearchResults';

import style from './less/eventsContainer.less';

const Events: FC = () => {
  return (
    <section className={style.section}>
      <Heading title="Arrangementer" />
      <SearchModule />
      <SearchResults />
    </section>
  );
};

export default Events;
