import { EventView } from '../models/Event';

export const getFrontpageEventView = (viewString: string | undefined) => {
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

export const getEventView = (viewString: string | undefined) => {
  if (!viewString) {
    return EventView.LIST;
  }
  const view = Number(viewString);
  if (EventView.LIST === view) {
    return view;
  } else {
    return EventView.LIST;
  }
};
