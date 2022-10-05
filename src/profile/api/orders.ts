import { DateTime } from 'luxon';

import { IAuthUser } from 'authentication/models/User';
import { getAllPages } from 'common/utils/api';
import { IOrderData } from 'payments/components/Transactions/Purchases';
import { IOrderLine } from 'shop/models';

const API_URL = '/api/v1/profile/orders/';

export const transformOrderData = (orderLines: IOrderLine[]): IOrderData[] => {
  const orderData: IOrderData[] = [];
  for (const orderLine of orderLines) {
    for (const data of orderLine.orders) {
      orderData.push({
        amount: data.quantity,
        date: DateTime.fromISO(orderLine.datetime),
        paid: orderLine.paid,
        price: data.price,
        product: data.content_object?.name || "Fjernet vare",
      });
    }
  }
  return orderData;
};

export const getOrders = async (user: IAuthUser): Promise<IOrderLine[]> => {
  const results = await getAllPages<IOrderLine>(API_URL, { page_size: 80 }, { user });
  return results;
};
