import { IAuthUser } from 'authentication/models/User';
import { WEBPUSH_SERVER_URL } from 'common/constants/vapid';
import { get, post } from 'common/utils/api';
import { IChannel } from 'profile/models/Notification';

const API_DOMAIN = WEBPUSH_SERVER_URL;
const API_URL = '/public';

export const subscribe = async (sub: PushSubscription, user: IAuthUser) => {
  const json = sub.toJSON();
  await post(API_URL + '/subscribe', json, {}, { user, domain: API_DOMAIN });
};

export const unsubscribe = async (sub: PushSubscription, user: IAuthUser) => {
  const json = sub.toJSON();
  await post(API_URL + '/unsubscribe', json, {}, { user, domain: API_DOMAIN });
};

export const getAllChannels = async (user: IAuthUser) => {
  const channels = await get<IChannel[]>(API_URL + '/channels', {}, { user, domain: API_DOMAIN });
  return channels;
};

export const getUserChannels = async (user: IAuthUser) => {
  const channels = await get<IChannel[]>(API_URL + '/user-channels', {}, { user, domain: API_DOMAIN });
  return channels;
};

export const postUserChannels = async (channelNames: string[], user: IAuthUser) => {
  const channels = await post<IChannel[]>(
    API_URL + '/user-channels',
    { channels: channelNames },
    {},
    { user, domain: API_DOMAIN }
  );
  return channels;
};
