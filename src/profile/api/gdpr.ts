import { IAuthUser } from 'authentication/models/User';
import { get, put } from 'common/utils/api';

const API_URL = '/api/v1/users/';

// user = logged in user, id is id of user to anonymize, default to self
export const anonymizeUser = async (
  user: IAuthUser,
  id: string = user.profile.sub,
  username: string,
  password: string
) => {
  try {
    return await put({ query: `${API_URL}${id}/anonymize_user/`, data: { username, password }, options: { user } });
  } catch(response) {
    throw new Error(`Kunne ikke slette bruker: ${response.statusText}`);
  }
};

// user = logged in user, id is id of user to fetch data from, default to self
export const fetchUserData = async (user: IAuthUser, id: string = user.profile.sub) => {
  try{
    return await get(`${API_URL}${id}/dump-data/`, undefined, { user });
  } catch(response) {
    console.error(response);
    throw new Error(`Kunne ikke hente brukerdata: ${response.statusText}`);
  }
};
