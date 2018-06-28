import { get } from 'common/utils/api';
import { EventType, getEventType, INewEvent } from '../models/Event';

export interface IEventAPIArguemnts {
  event_end__gte?: string;
  event_start__gte?: string;
  event_type?: string[] | string
  page?: number;
}

const API_URL = '/api/v1/events/';

export const getEvents = async (args?: IEventAPIArguemnts): Promise<INewEvent[]> => {
  const { results }: { results:  INewEvent[] } = await get(API_URL, { format: 'json', ...args });
  return results;
}

const normalize = (event: any): any => {
  return {
    event_type: getEventType(1),
    ...event
  }
}