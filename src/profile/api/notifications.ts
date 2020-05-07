import { getUser } from 'authentication/api';
import { WEBPUSH_SERVER_URL } from 'common/constants/vapid';
import { get, post } from 'common/utils/api';
import { IChannel } from 'profile/models/Notification';

const API_DOMAIN = WEBPUSH_SERVER_URL;
const API_URL = '/public';

export const subscribe = async (sub: PushSubscription) => {
  const json = sub.toJSON();
  const user = await getUser();
  await post(API_URL + '/subscribe', json, {}, { user, domain: API_DOMAIN });
};

export const unsubscribe = async (sub: PushSubscription) => {
  const json = sub.toJSON();
  const user = await getUser();
  await post(API_URL + '/unsubscribe', json, {}, { user, domain: API_DOMAIN });
};

export const getAllChannels = async () => {
  const user = await getUser();
  const channels = await get<IChannel[]>(API_URL + '/channels', {}, { user, domain: API_DOMAIN });
  return channels;
};

export const getUserChannels = async () => {
  const user = await getUser();
  const channels = await get<IChannel[]>(API_URL + '/user-channels', {}, { user, domain: API_DOMAIN });
  return channels;
};

export const postUserChannels = async (channelNames: string[]) => {
  const user = await getUser();
  const channels = await post<IChannel[]>(
    API_URL + '/user-channels',
    { channels: channelNames },
    {},
    { user, domain: API_DOMAIN }
  );
  return channels;
};
