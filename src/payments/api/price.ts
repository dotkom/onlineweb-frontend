import { getUser } from 'authentication/api';
import { get } from 'common/utils/api';
import { IPaymentPrice } from 'payments/models/Payment';

const API_URL = '/api/v1/payment/prices/';

export const getPrice = async (id: number) => {
  const user = await getUser();
  const data = await get<IPaymentPrice>(API_URL + id, { format: 'json' }, { user });
  return data;
};
