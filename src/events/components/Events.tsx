import { clearCache } from 'common/utils/cache';
import { CookieActionType, CookieContext } from 'core/providers/Cookies';
import { DateTime } from 'luxon';
import React, { ChangeEvent, useContext, useState } from 'react';

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

export const Events = () => {
  const { cookies, dispatch } = useContext(CookieContext);
  const View = getView(cookies.eventView);
  const changeView = (view: EventView) => {
    dispatch({ type: CookieActionType.CHANGE, value: { eventView: view } });
    clearCache();
  };

  const [accessible, setAccessible] = useState(false);

  const toggleAccessible = () => setAccessible(!accessible);
  const onTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CookieActionType.CHANGE, value: { searchText: event.target.value } });
  };

  const onTimeStartInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CookieActionType.CHANGE, value: { timeStart: DateTime.fromISO(event.target.value) } });
  };

  const onTimeEndInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CookieActionType.CHANGE, value: { timeEnd: DateTime.fromISO(event.target.value) } });
  };

  return (
    <section className={style.section}>
      <EventsHeader
        changeView={changeView}
        toggleAccessible={toggleAccessible}
        accessible={accessible}
        view={cookies.eventView}
        availableViews={[EventView.LIST, EventView.CALENDAR]}
      />
      <SearchModule
        searchText={cookies.searchText}
        onTextInput={onTextInput}
        timeStart={cookies.timeStart.toFormat('yyyy-MM-dd') || '2013-01-01'}
        timeEnd={cookies.timeEnd.toFormat('yyyy-MM-dd') || '2020-01-01'}
        onTimeStartInput={onTimeStartInput}
        onTimeEndInput={onTimeEndInput}
      />
      <View accessible={accessible} />
    </section>
  );
};

export default Events;
