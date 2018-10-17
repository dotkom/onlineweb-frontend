import { get, IAPIData } from 'common/utils/api';
import { IArticle } from '../models/Article';

const API_URL = '/api/v1/articles/';

export const getArticles = async (): Promise<IArticle[]> => {
  const data: IAPIData<IArticle> = await get(API_URL, { format: 'json' });
  return data.results;
};
