import React, { useState } from 'react';

import EventsHeader from './EventsHeader';
import ListView from './ListView';
import SearchModule from './SearchModule';

import style from './less/eventsContainer.less';

const Events = () => {
  const [accessible, setAccessible] = useState(false);

  const toggleAccessible = () => setAccessible(!accessible);

  return (
    <section className={style.section}>
      <EventsHeader toggleAccessible={toggleAccessible} accessible={accessible} />
      <SearchModule />
      <ListView accessible={accessible} filtered={true} />
    </section>
  );
};

export default Events;
