import { clearCache } from 'common/utils/cache';
import { CookieActionType, CookieContext } from 'core/providers/Cookies';
import React, { useContext, useState } from 'react';

import { EventView } from '../models/Event';
import CalendarView from './CalendarView';
import EventsHeader from './EventsHeader';
import ImageView from './ImageView';
import style from './less/eventsContainer.less';
import ListView from './ListView';
import SearchModule from './SearchModule';

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

export const EventArchive = () => {
  const { cookies, dispatch } = useContext(CookieContext);
  const View = getView(cookies.archiveEventView);
  const changeView = (view: EventView) => {
    dispatch({ type: CookieActionType.CHANGE, value: { archiveEventView: view } });
    clearCache();
  };

  const [accessible, setAccessible] = useState(false);
  const toggleAccessible = () => setAccessible(!accessible);
  return (
    <section className={style.section}>
      <SearchModule />
      <EventsHeader
        changeView={changeView}
        toggleAccessible={toggleAccessible}
        accessible={accessible}
        view={cookies.archiveEventView}
        availableViews={[EventView.LIST, EventView.CALENDAR]}
      />
      <View accessible={accessible} />
    </section>
  );
};

export default EventArchive;
