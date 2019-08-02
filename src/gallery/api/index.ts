import IResponsiveImage from 'common/models/ResponsiveImage';
import { get, IAPIData, IBaseAPIParameters } from 'common/utils/api';

const API_URL = '/api/v1/images';

export interface IResponsiveImageParameters extends IBaseAPIParameters {
  search?: string;
}

export const getResponsiveImages = async (args?: IResponsiveImageParameters) => {
  const { results } = await get<IAPIData<IResponsiveImage>>(API_URL, { ...args });
  return results;
};
