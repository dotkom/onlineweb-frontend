import { IAuthUser } from 'authentication/models/User';
import { get, getAllPages, IBaseAPIParameters } from 'common/utils/api';
import { EventTypeEnum, IEvent } from '../models/Event';

export interface IEventAPIParameters extends IBaseAPIParameters {
  event_start__gte?: string;
  event_start__lte?: string;
  event_end__gte?: string;
  event_end__lte?: string;
  event_type?: EventTypeEnum[] | EventTypeEnum;
  is_attendee?: 'True' | 'False';
}

export interface IAPIData<T> {
  results: T[];
  next: string | null;
  previous: string | null;
  count: number;
}

const API_URL = '/api/v1/events/';

export const getEvents = async (args?: IEventAPIParameters): Promise<IEvent[]> => {
  const data = await get<IAPIData<IEvent>>(API_URL, { format: 'json', ...args });
  return data.results;
};

export const getAllUserEvents = async (args: IEventAPIParameters, user: IAuthUser): Promise<IEvent[]> => {
  const data = await getAllPages<IEvent>(API_URL, { format: 'json', page_size: 80, ...args }, { user });
  return data;
};

export const getEvent = async (id: number): Promise<IEvent> => {
  const event = await get<IEvent>(API_URL + id + '/', { format: 'json' });
  return event;
};

export interface IControlledFetch<T> {
  controller: AbortController;
  data: Promise<IAPIData<T>>;
}

export const controlledGetEvents = (args?: IEventAPIParameters): IControlledFetch<IEvent> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const data = get<IAPIData<IEvent>>(API_URL, { format: 'json', ...args }, { signal });
  return { data, controller };
};
