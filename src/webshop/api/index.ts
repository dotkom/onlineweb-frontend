import { getUser } from 'authentication/api';
import { getAllPages } from 'common/utils/api';
import { IOrderLine } from 'profile/models/Orders';

const ORDER_LINES_API_URL = '/api/v1/webshop/orderlines/';

export const getOrderLines = async () => {
  const user = await getUser();
  const data = await getAllPages<IOrderLine>(ORDER_LINES_API_URL, { format: 'json' }, { user });
  return data;
};
