import IResponsiveImage from 'common/models/ResponsiveImage';
import { IPayment } from 'payments/models/Payment';

export interface ISize {
  id: number;
  size: string;
  description: string | null;
  stock: number | null;
}

export interface IProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface IProduct {
  id: number;
  category: IProductCategory;
  name: string;
  slug: string;
  short: string;
  description: string | null;
  images: IResponsiveImage[];
  price: number;
  stock: number;
  deadline: string; // DateTime
  active: boolean;
  product_sizes: ISize[];
  related_products: number[];
}

export interface IOrder {
  id: number;
  product: IProduct;
  size: ISize | null;
  price: number;
  quantity: number;
  is_valid: boolean;
}

export interface IOrderLine {
  id: number;
  datetime: string | null;
  paid: boolean;
  stripe_id: string | null;
  delivered: boolean;
  orders: IOrder[];
  subtotal: number;
  is_valid: boolean;
  payment: IPayment | null;
}
