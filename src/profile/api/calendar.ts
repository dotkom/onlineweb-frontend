import { getUser } from 'authentication/api';
import { get } from 'common/utils/api';

const API_URL = '/users';

export interface IAPIData {
  link: string;
}
/**
 * Get calendar link for a user
 */
export const getCalendarLink = async () => {
  const user = await getUser();
  const id = user?.profile.sub;
  const data = await get<IAPIData>(`/api/v1${API_URL}/${id}/personalized_calendar_link/`, undefined, { user });
  return data.link;
};
