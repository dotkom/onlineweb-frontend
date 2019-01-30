import cookie from 'js-cookie';
import { EventView } from '../models/Event';

/**
 * EventSettings
 * Settings for the event views.
 */

const EVENT_SETTINGS_KEY = 'event-settings';

export interface IEventSettings {
  view: EventView;
  accessible: boolean;
}

const DEFAULT_SETTINGS: IEventSettings = {
  view: EventView.IMAGE,
  accessible: false,
};

export const getEventSettings = async (): Promise<IEventSettings> => {
  const settings = await window.localStorage.getItem(EVENT_SETTINGS_KEY);
  return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
};

export const saveEventSettings = async (settings: IEventSettings) => {
  const str = JSON.stringify(settings);
  cookie.set('eventView', settings.view.toString());
  await window.localStorage.setItem(EVENT_SETTINGS_KEY, str);
};
