import { EventView } from '../models/Event';

export const getEventView = (viewString: string | undefined) => {
  if (!viewString) {
    return EventView.IMAGE;
  }
  const view = Number(viewString);
  if ([EventView.IMAGE, EventView.LIST, EventView.CALENDAR].indexOf(view) >= 0) {
    return view;
  } else {
    return EventView.IMAGE;
  }
};
