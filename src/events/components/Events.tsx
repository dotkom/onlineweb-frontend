import React, { useContext, useState } from 'react';

import { clearCache } from 'common/utils/cache';
import { CookieActionType, CookieContext } from 'core/providers/Cookies';

import { EventView } from 'events/models/Event';
import CalendarView from './CalendarView';
import EventsHeader from './EventsHeader';
import ImageView from './ImageView';
import ListView from './ListView';
import SearchModule from './SearchModule';

import style from './less/eventsContainer.less';

const getView = (view?: EventView): typeof ListView | typeof CalendarView | typeof ImageView => {
  switch (view) {
    case EventView.LIST:
      return ListView;
    case EventView.CALENDAR:
      return CalendarView;
    default:
      return ListView;
  }
};

const Events = () => {
  const { cookies, dispatch } = useContext(CookieContext);
  const View = getView(cookies.eventView);
  const changeView = (view: EventView) => {
    dispatch({ type: CookieActionType.CHANGE, value: { eventView: view } });
    clearCache();
  };

  const [accessible, setAccessible] = useState(false);

  const toggleAccessible = () => setAccessible(!accessible);

  return (
    <section className={style.section}>
      <EventsHeader
        changeView={changeView}
        toggleAccessible={toggleAccessible}
        accessible={accessible}
        view={cookies.eventView}
        availableViews={[EventView.LIST, EventView.CALENDAR]}
      />
      <SearchModule />
      <View accessible={accessible} filtered={true} />
    </section>
  );
};

export default Events;
