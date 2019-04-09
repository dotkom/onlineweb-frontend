import { clearCache } from 'common/utils/cache';
import { CookieActionType, CookieContext } from 'core/providers/Cookies';
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

export const EventArchive = () => {
  const { cookies, dispatch } = useContext(CookieContext);
  const View = getView(cookies.archiveEventView);
  const changeView = (view: EventView) => {
    dispatch({ type: CookieActionType.CHANGE, value: { archiveEventView: view } });
    clearCache();
  };

  const [accessible, setAccessible] = useState(false);
  const [text, setText] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');

  const toggleAccessible = () => setAccessible(!accessible);
  const onTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onTimeStartInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeStart(event.target.value);
  };

  const onTimeEndInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeEnd(event.target.value);
  };

  return (
    <section className={style.section}>
      <EventsHeader
        changeView={changeView}
        toggleAccessible={toggleAccessible}
        accessible={accessible}
        view={cookies.archiveEventView}
        availableViews={[EventView.LIST, EventView.CALENDAR]}
      />
      <SearchModule
        searchText={text}
        onTextInput={onTextInput}
        timeStart={timeStart}
        timeEnd={timeEnd}
        onTimeStartInput={onTimeStartInput}
        onTimeEndInput={onTimeEndInput}
      />
      <View accessible={accessible} />
    </section>
  );
};

export default EventArchive;
