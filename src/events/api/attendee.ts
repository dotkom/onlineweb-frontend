import { get, post, deleteR, patch } from 'common/utils/api';

import { getUser } from 'authentication/api';

import { IAttendee } from 'events/models/Attendee';
import { IAuthUser } from 'authentication/models/User';

const getEventAttendeeUrl = (eventId: number) => `/api/v1/event/attendance-events/${eventId}/attendee/`;
const getUserAttendUrl = (eventId: number) => `/api/v1/event/attendance-events/${eventId}/register/`;
const getUserUnAttendUrl = (eventId: number) => `/api/v1/event/attendance-events/${eventId}/unregister/`;
const patchUserExtraUrl = (attendeeId: number) => `/api/v1/event/attendees/${attendeeId}/change/`;

interface IAttendEventOptions {
  allowPictures?: boolean;
  showAsAttending?: boolean;
  extras?: number | null;
  note?: string;
}

export const getAttendeeForEvent = async (eventId: number): Promise<IAttendee> => {
  const user = await getUser();
  const attendee = await get<IAttendee>(getEventAttendeeUrl(eventId), { format: 'json' }, { user });
  return attendee;
};

export const userAttendEvent = async (
  eventId: number,
  captcha: string,
  options?: IAttendEventOptions,
  user?: IAuthUser
): Promise<IAttendee> => {
  if (!user) {
    user = await getUser();
  }

  try {
    const ret = await post<IAttendee>(
      getUserAttendUrl(eventId),
      {
        show_as_attending_event: options?.showAsAttending,
        allow_pictures: options?.allowPictures,
        extras: options?.extras,
        turnstile: captcha,
      },
      undefined,
      { user }
    );
    return ret;
  } catch (response) {
    throw new Error('Kunne ikke melde brukeren på dette arrangementet!');
  }
};

export const userUnattendEvent = async (eventId: number, data?: unknown, user?: IAuthUser): Promise<unknown> => {
  if (!user) {
    user = await getUser();
  }

  try {
    const ret = await deleteR(getUserUnAttendUrl(eventId), data, undefined, { user });
    return ret;
  } catch (response) {
    throw new Error('Kunne ikke melde brukeren av dette arrangementet!');
  }
};

export const changeUserExtra = async (attendeeId: number, extras: number) => {
  const user = await getUser();

  try {
    const ret = await patch<IAttendee>({
      query: patchUserExtraUrl(attendeeId),
      data: { extras: extras == -1 ? null : extras },
      options: { user },
    });
    return ret;
  } catch (res) {
    throw new Error('Fikk ikke registrert ekstra på bruker!');
  }
};
