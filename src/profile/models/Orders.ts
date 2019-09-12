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
  id: number;
  price: number;
  quantity: number;
  size: ISize | null;
  product: IProduct;
}

export interface ISize {
  size: string;
}

export interface IProduct {
  name: string;
  price: number;
  description: string | null;
  images: IResponsiveImage[];
  category: IProductCategory;
}

export interface IProductCategory {
  pk: number;
  name: string;
}
