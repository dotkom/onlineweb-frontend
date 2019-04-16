import { get, IAPIData, IBaseAPIParameters } from 'common/utils/api';
import { IArticle } from '../models/Article';

export interface IArticleAPIParameters extends IBaseAPIParameters {
  year?: string;
  month?: string;
  query?: string;
  tags?: string[] | string;
}

const API_URL = '/api/v1/articles/';

export const getArticles = async (args?: IArticleAPIParameters): Promise<IArticle[]> => {
  const data: IAPIData<IArticle> = await get(API_URL, { format: 'json', ...args });
  return data.results;
};

export const getArticle = async (id: number): Promise<IArticle> => {
  const article: IArticle = await get(API_URL + id + '/', { format: 'json' });
  return article;
};
