import { getUser } from 'authentication/api';
import { IAuthUser } from 'authentication/models/User';

import { get, getAllPages, IBaseAPIParameters, IAPIData, post } from 'common/utils/api';
import { listResource } from 'common/resources';
import { IQueryObject } from 'common/utils/queryString';
import { EventTypeEnum, IAttendanceEvent, IEvent } from '../models/Event';
import { IExtra } from '../models/Extras';
import { IPayment } from 'payments/models/Payment';
import { IPublicAttedee, IAttendee, IAttendResponse } from 'events/models/Attendee';


export interface IEventAPIParameters extends IQueryObject {
  event_start__gte?: string;
  event_start__lte?: string;
  event_end__gte?: string;
  event_end__lte?: string;
  event_type?: EventTypeEnum[] | EventTypeEnum;
  is_attendee?: 'True' | 'False';
  query?: string;
  attendance_event__isnull?: 'True' | 'False';
  ordering?: string;
}

const EVENTS_API_URL = '/api/v1/event/events/';
const ATTENDANCE_EVENT_API_URL = '/api/v1/event/attendance-events/';
const USER_ATTENDEES_API_URL =  '/register/';
//const USER_UNATTENDEES_API_URL =  '/unregister/';
const EVENT_PAYMENT_URL =  '/payment/';
const EVENT_EXTRAS_URL = '/extras/'
const EVENT_ATTENDEE_URL = '/attendee/'
const EVENT_PUBLIC_ATTENDEES = '/public-attendees/'

export const listEvents = listResource<IEvent, IEventAPIParameters>(EVENTS_API_URL);




export const getEvents = async (args?: IEventAPIParameters & IBaseAPIParameters): Promise<IEvent[]> => {
  const data = await get<IAPIData<IEvent>>(EVENTS_API_URL, { format: 'json', ...args });
  return data.results;
};

export const getAllEvents = async (args: IEventAPIParameters, user?: IAuthUser): Promise<IEvent[]> => {
  const data = await getAllPages<IEvent>(EVENTS_API_URL, { format: 'json', page_size: 80, ...args }, { user });
  return data;
};

export const getEvent = async (id: number): Promise<IEvent> => {
  const event = await get<IEvent>(EVENTS_API_URL + id + '/', { format: 'json' });
  return event;
};

export const getAttendanceEvent = async (id: number): Promise<IAttendanceEvent> => {
  const user = await getUser();
  const attendanceEvent = await get<IAttendanceEvent>(
    `${ATTENDANCE_EVENT_API_URL}${id}/`,
    { format: 'json' },
    { user }
  );
  return attendanceEvent;
};


interface IAttendEventOptions {
  allowPictures?: boolean,
  showAsAttending?: boolean,
  extras?: number[] // options id

}

export const getEventPayment = async (event_id: number): Promise<IPayment> => {
  
  try{
    const ret = await get<IPayment>(`${ATTENDANCE_EVENT_API_URL}${event_id}${EVENT_PAYMENT_URL}`);
    return ret;
  } catch(response){
    throw new Error("Kunne ikke hente betalingsinformasjon for arrangementet!");
  }
}

export const getEventExtras = async (event_id: number): Promise<IExtra[]> => {
  
  try{
    const ret = await get<IExtra[]>(`${ATTENDANCE_EVENT_API_URL}${event_id}${EVENT_EXTRAS_URL}`);
    return ret;
  } catch(response){
    throw new Error("Kunne ikke hente valgmuligheter for arrangementet!");
  }
}

export const getEventAttendee = async (event_id: number, user?: IAuthUser): Promise<IAttendee> => {
  if(!user){
    user = await getUser();
  }

  try{
    const ret = await get<IAttendee>(`${ATTENDANCE_EVENT_API_URL}${event_id}${EVENT_ATTENDEE_URL}`, undefined, {user});
    return ret;
  } catch(response){
    throw new Error("Kunne ikke hente valgmuligheter for arrangementet!");
  }
}

export const userAttendEvent = async (event_id: number, captcha: string, options?: IAttendEventOptions, user?: IAuthUser): Promise<IAttendResponse> => {
  if(!user){
    user = await getUser();
  }
  
  try{
    const ret = await post<IAttendResponse>(`${ATTENDANCE_EVENT_API_URL}${event_id}${USER_ATTENDEES_API_URL}`, {
      show_as_attending_event: options?.showAsAttending,
      allow_pictures: options?.allowPictures,
      extras: options?.extras,
      recaptcha: captcha
    }, undefined, {user})
    return ret;
  } catch(response){
    throw new Error("Kunne ikke melde brukeren på dette arrangementet!");
  }
}

export const getPublicAttends = async (event_id: number): Promise<IPublicAttedee[]> => {
  try{
    const ret: IPublicAttedee[] = await get(`${ATTENDANCE_EVENT_API_URL}${event_id}${EVENT_PUBLIC_ATTENDEES}`)
    return ret;
  } catch(response){
    throw new Error("Kunne hente påmeldingsliste!");
  }
}

/* Requires PR #334
export const userUnattendEvent = async (event_id: number, user?: IAuthUser): Promise<unknown> => {
  if(!user){
    user = await getUser();
  }
  
  try{
    const ret = await deleteR(`${ATTENDANCE_EVENT_API_URL}${event_id}${USER_UNATTENDEES_API_URL}`, undefined, {user})
    return ret;
  } catch(response){
    throw new Error("Kunne ikke melde brukeren av dette arrangementet!");
  }
}
*/


export interface IControlledFetch<T> {
  controller: AbortController;
  data: Promise<IAPIData<T>>;
}

export const controlledGetEvents = (args?: IEventAPIParameters): IControlledFetch<IEvent> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const data = get<IAPIData<IEvent>>(EVENTS_API_URL, { format: 'json', ...args }, { signal });
  return { data, controller };
};
