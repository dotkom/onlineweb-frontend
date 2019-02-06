import { IAuthUser } from 'authentication/models/User';
import { get, post } from 'common/utils/api';
import { IChannel } from 'profile/models/Notification';

const API_DOMAIN = 'http://localhost:8081';
const API_URL = '/public';

export const subscribe = async (sub: PushSubscription, user: IAuthUser) => {
  const json = sub.toJSON();
  await post(API_URL + '/subscribe', json, {}, { user, domain: API_DOMAIN });
};

export const getAllChannels = async (user: IAuthUser): Promise<IChannel[]> => {
  const channels = await get(API_URL + '/channels', {}, { user, domain: API_DOMAIN });
  return channels;
};

export const getUserChannels = async (user: IAuthUser): Promise<string[]> => {
  const channels = await get(API_URL + '/user-channels', {}, { user, domain: API_DOMAIN });
  return channels;
};

export const postUserChannels = async (channels: string[], user: IAuthUser): Promise<string[]> => {
  const updated = await post(API_URL + '/user-channels', { channels }, {}, { user, domain: API_DOMAIN });
  return updated;
};
