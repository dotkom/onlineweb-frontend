import IResponsiveImage from 'common/models/ResponsiveImage';
import { IPayment } from 'payments/models/Payment';

export interface IOrderLine {
  id: number;
  paid: boolean;
  datetime: string;
  orders: IOrder[];
  stripe_id?: string;
  subtotal: number;
  payment: IPayment;
}

export interface IOrder {
  price: number;
  quantity: number;
  content_object: IStoreItem;
}

export interface IStoreItem {
  name: string;
  price: number;
  description: string | null;
  image: IResponsiveImage;
  category: IStoreItemCategory;
}

export interface IStoreItemCategory {
  pk: number;
  name: string;
}
