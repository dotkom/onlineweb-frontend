import React, { useState } from 'react';

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
  const [eventView, setEventView] = useState<EventView>(EventView.IMAGE);
  const View = getView(eventView);

  const [accessible, setAccessible] = useState(false);
  const toggleAccessible = () => setAccessible(!accessible);
  return (
    <section className={style.section}>
      <EventsHeader
        changeView={setEventView}
        toggleAccessible={toggleAccessible}
        accessible={accessible}
        view={eventView}
      />
      <View accessible={accessible} />
    </section>
  );
};

export default EventContainer;
