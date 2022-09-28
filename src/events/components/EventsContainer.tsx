import React, { useState } from 'react';

import { EventView } from '../models/Event';
import CalendarView from './CalendarView';
import EventsHeader from './EventsHeader';
import ImageView from './ImageView';
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

  return (
    <section>
      <EventsHeader changeView={setEventView} view={eventView} />
      <View />
    </section>
  );
};

export default EventContainer;
