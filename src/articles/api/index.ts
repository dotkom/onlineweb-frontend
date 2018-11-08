import { get, IAPIData } from 'common/utils/api';
import { getStateCache } from 'common/utils/stateCacheResolver';
import { IArticle } from '../models/Article';

const API_URL = '/api/v1/articles/';

export const getArticles = async (): Promise<IArticle[]> => {
  const data: IAPIData<IArticle> = await get(API_URL, { format: 'json' });
  return data.results;
};

export const getServerCacheArticles = (): IArticle[] => {
  const cache = getStateCache();
  return (cache && cache.articles) || [];
};
