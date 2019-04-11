import { clearCache } from 'common/utils/cache';
import { CookieActionType, CookieContext } from 'core/providers/Cookies';
import React, { useContext, useState } from 'react';

import { EventView } from '../models/Event';
import CalendarView from './CalendarView';
import EventsHeader from './EventsHeader';
import ImageView from './ImageView';
import style from './less/eventsContainer.less';
import ListView from './ListView';

const getView = (view?: EventView): typeof ListView | typeof CalendarView | typeof ImageView => {
  switch (view) {
    case EventView.IMAGE:
      return ImageView;
    case EventView.LIST:
      return ListView;
    case EventView.CALENDAR:
      return CalendarView;
    default:
      return ImageView;
  }
};

export const EventContainer = () => {
  const { cookies, dispatch } = useContext(CookieContext);
  const View = getView(cookies.frontpageEventView);
  const changeView = (view: EventView) => {
    dispatch({ type: CookieActionType.CHANGE, value: { frontpageEventView: view } });
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
        view={cookies.frontpageEventView}
        availableViews={[EventView.IMAGE, EventView.LIST, EventView.CALENDAR]}
      />
      <View accessible={accessible} filtered={false} />
    </section>
  );
};

export default EventContainer;
