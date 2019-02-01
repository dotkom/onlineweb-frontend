import { IAuthUser } from 'authentication/models/User';
import { getAllPages } from 'common/utils/api';
import { IOrderLine } from 'profile/models/Orders';

const API_URL = '/api/v1/profile/orders';

export const getOrders = async (user: IAuthUser): Promise<IOrderLine[]> => {
  const results = await getAllPages<IOrderLine>(API_URL, { page_size: 80 }, { user });
  return results;
};
