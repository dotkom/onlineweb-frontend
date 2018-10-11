import { get } from 'common/utils/api';
import { EventType, getEventType, INewEvent } from '../models/Event';
import { getPackedSettings } from 'http2';

export interface IEventAPIArguemnts {
  event_period_start?: string;
  event_period_end?: string;
  event_end__gte?: string;
  event_type?: number[] | number;
  page?: number;
}

export interface IAPIData<T> {
  results: T[];
  next: string | null;
  previous: string | null;
  count: number;
}

const API_URL = '/api/v1/events/';

export const getEvents = async (args?: IEventAPIArguemnts): Promise<INewEvent[]> => {
  const data: IAPIData<INewEvent> = await get(API_URL, { format: 'json', ...args });
  return data.results;
}

export const getAllEvents = async (args?: IEventAPIArguemnts): Promise<INewEvent[]> => {
  const data: IAPIData<INewEvent> = await get(API_URL, { format: 'json', ...args });
  let { results } = data;
  let nextPage = data.next;
  if (nextPage) {
    let next: IAPIData<INewEvent>
    for await(next of getPages(nextPage)) {
      results = [...results, ...next.results];
      if (!next.next) { break };
      nextPage = next.next
    }
  }
  return results;
}

async function* getPages(page: string) {
  while(true) {
    const response = await fetch(page);
    const data = await response.json();
    yield data;
  }
}

export const getEvent = async (id: number): Promise<INewEvent> => {
  const event: INewEvent = await get(API_URL + id + '/', { format: 'json' });
  console.log(event);
  return event;
}

const normalize = (event: any): any => {
  return {
    event_type: getEventType(1),
    ...event
  }
}