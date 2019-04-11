import { clearCache } from 'common/utils/cache';
import { CookieActionType, CookieContext } from 'core/providers/Cookies';
import React, { ChangeEvent, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { EventTypeEnum, EventView } from '../models/Event';
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

const Events = ({ location, history }: RouteComponentProps) => {
  const { cookies, dispatch } = useContext(CookieContext);
  const View = getView(cookies.eventView);
  const changeView = (view: EventView) => {
    dispatch({ type: CookieActionType.CHANGE, value: { eventView: view } });
    clearCache();
  };

  const [accessible, setAccessible] = useState(false);

  const toggleAccessible = () => setAccessible(!accessible);

  const params = new URLSearchParams(location.search);

  const onTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    params.set('search', event.target.value);
    history.replace(location.pathname + '?' + params);
  };

  const onTimeStartInput = (event: ChangeEvent<HTMLInputElement>) => {
    params.set('dateStart', event.target.value);
    history.replace(location.pathname + '?' + params);
  };

  const onTimeEndInput = (event: ChangeEvent<HTMLInputElement>) => {
    params.set('dateEnd', event.target.value);
    history.replace(location.pathname + '?' + params);
  };

  const onEventTypeInput = (event: ChangeEvent<HTMLSelectElement>) => {
    const eventTypes: EventTypeEnum[] = [...event.target.options]
      .filter((o) => o.selected)
      .map((o) => parseInt(o.value, 10));
    params.set('eventTypes', JSON.stringify(eventTypes));
    history.replace(location.pathname + '?' + params);
  };

  const onAttendanceEventInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      params.delete('attendanceEvents');
    } else {
      params.set('attendanceEvents', 'off');
    }
    history.replace(location.pathname + '?' + params);
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
        onTextInput={onTextInput}
        onTimeStartInput={onTimeStartInput}
        onTimeEndInput={onTimeEndInput}
        onEventTypesInput={onEventTypeInput}
        onAttendanceEventInput={onAttendanceEventInput}
      />
      <View accessible={accessible} filtered={true} />
    </section>
  );
};

export default Events;
