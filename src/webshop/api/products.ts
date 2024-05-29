import { listResource, retrieveResource } from 'common/resources';
import { IProduct } from 'webshop/models';

const API_URL = '/api/v1/webshop/products';

export const listProducts = listResource<IProduct>(API_URL);

export const retrieveProduct = retrieveResource<IProduct>(API_URL);
