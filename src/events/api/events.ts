import { IAuthUser } from 'authentication/models/User';
import { get, getAllPages, IBaseAPIParameters } from 'common/utils/api';
import { EventTypeEnum, INewEvent } from '../models/Event';

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

export const getEvents = async (args?: IEventAPIParameters): Promise<INewEvent[]> => {
  const data: IAPIData<INewEvent> = await get(API_URL, { format: 'json', ...args });
  return data.results;
};

export const getAllUserEvents = async (args: IEventAPIParameters, user: IAuthUser): Promise<INewEvent[]> => {
  const data = await getAllPages<INewEvent>(API_URL, { format: 'json', page_size: 80, ...args }, { user });
  return data;
};

export const getEvent = async (id: number): Promise<INewEvent> => {
  const event: INewEvent = await get(API_URL + id + '/', { format: 'json' });
  return event;
};

export interface IControlledFetch<T> {
  controller: AbortController;
  data: Promise<IAPIData<T>>;
}

export const controlledGetEvents = (args?: IEventAPIParameters): IControlledFetch<INewEvent> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const data: Promise<IAPIData<INewEvent>> = get(API_URL, { format: 'json', ...args }, { signal });
  return { data, controller };
};
