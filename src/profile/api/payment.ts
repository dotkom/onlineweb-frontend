import { IPayment } from '../models/Payment';

const paymentsMock: IPayment[] = [
  {
    active: false,
    deadline: '',
    delay: 2,
    object_id: 1,
    payment_type: 'Umiddelbar',
    price: {
      description: 'Price description',
      price: 350,
    },
  },
];

/**
 * @summary Fetch Payments from API.
 * @returns {IPayment}
 */
export const getPayments = async (): Promise<IPayment[]> => {
  // const { data } = await get(API_URL, { format: 'json' });
  const data = paymentsMock;
  return data;
};
