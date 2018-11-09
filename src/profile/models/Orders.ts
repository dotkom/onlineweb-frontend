import IImage from 'common/models/Image';

export interface IOrderLine {
  paid: boolean;
  datetime: string;
  orders: IOrder[];
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
  image: IImage;
  category: IStoreItemCategory;
}

export interface IStoreItemCategory {
  pk: number;
  name: string;
}
