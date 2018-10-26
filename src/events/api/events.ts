import { get, IBaseAPIParameters } from 'common/utils/api';
import { getEventType, INewEvent } from '../models/Event';

export interface IEventAPIParameters extends IBaseAPIParameters {
  event_start__gte?: string;
  event_start__lte?: string;
  event_type?: number[] | number;
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

export const getAllEvents = async (args?: IEventAPIParameters): Promise<INewEvent[]> => {
  const data: IAPIData<INewEvent> = await get(API_URL, { format: 'json', ...args });
  let { results } = data;
  if (data.next) {
    let next: IAPIData<INewEvent>; // tslint:disable-line no-shadowed-variable
    for await(next of getPages(data.next)) {
      results = [...results, ...next.results];
      if (!next.next) { break; }
    }
  }
  return results;
};

async function* getPages(page: string) {
  let nextPage = page;
  while (true) {
    const response = await fetch(nextPage);
    const data: IAPIData<INewEvent> = await response.json();
    nextPage = data.next || '';
    yield data;
  }
}

export const getEvent = async (id: number): Promise<INewEvent> => {
  const event: INewEvent = await get(API_URL + id + '/', { format: 'json' });
  return event;
};

const normalize = (event: any): any => {
  return {
    event_type: getEventType(1),
    ...event,
  };
};
