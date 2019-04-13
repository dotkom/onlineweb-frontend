import IImage, { DEFAULT_EVENT_IMAGE } from 'common/models/Image';

export interface IArticle {
  articleUrl: string;
  heading: string;
  image: IImage;
  ingress: string;
  absolute_url: string;
  ingress_short: string;
  id: number;
}

export const mockArticle: IArticle = {
  articleUrl: '',
  heading: 'ha',
  image: DEFAULT_EVENT_IMAGE,
  ingress: '',
  absolute_url: '',
  ingress_short: '',
  id: 0,
};
