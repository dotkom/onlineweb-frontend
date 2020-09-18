import { get, put } from 'common/utils/api';
import { IPrivacy } from '../models/Privacy';
import { getUser } from 'authentication/api';

const API_URL = '/api/v1/profile/privacy/';

/**
 * @returns {IPrivacy} Privacy options for a logged in OnlineUser.
 */
export const getPrivacyOptions = async (): Promise<IPrivacy> => {
  const user = await getUser();
  const data = await get<IPrivacy>(API_URL, { format: 'json' }, { user });
  return data;
};

/**
 * @summary Post privacy options, get back what they are updated to.
 * @param {IPrivacy} privacyOptions Changed Privacy options for a user.
 * @returns {IPrivacy} The current state of OnlineUsers Privacy options.
 */
export const putPrivacyOptions = async (privacyOptions: IPrivacy): Promise<IPrivacy> => {
  const user = await getUser();
  const data = await put<IPrivacy>({ query: API_URL, data: privacyOptions, options: { user } });
  return data;
};
