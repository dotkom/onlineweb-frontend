import { IAuthUser } from 'authentication/models/User';
import { get, withUser } from 'common/utils/api';
import { IOrderLine } from 'profile/models/Orders';

const API_URL = '/api/v1/profile/orders';

export const getOrders = async (user: IAuthUser): Promise<IOrderLine[]> => {
  const { results } = await get(API_URL, { page_size: 80 }, withUser(user));
  return results;
};
