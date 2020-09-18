import { get, put } from 'common/utils/api';
import { getUser } from 'authentication/api';

const API_URL = '/api/v1/users/';

// user = logged in user, id is id of user to anonymize, default to self
export const anonymizeUser = async (username: string, password: string) => {
  try {
    const user = await getUser();
    const id = user?.profile.sub;
    return await put({ query: `${API_URL}${id}/anonymize_user/`, data: { username, password }, options: { user } });
  } catch (response) {
    throw new Error(`Kunne ikke slette bruker: ${response.statusText}`);
  }
};

// user = logged in user, id is id of user to fetch data from, default to self
export const fetchUserData = async () => {
  try {
    const user = await getUser();
    const id = user?.profile.sub;
    return await get(`${API_URL}${id}/dump-data/`, undefined, { user });
  } catch (response) {
    throw new Error(`Kunne ikke hente brukerdata: ${response.statusText}`);
  }
};
