import IResponsiveImage from 'common/models/ResponsiveImage';

export interface IArticle {
  articleUrl: string;
  heading: string;
  image: IResponsiveImage;
  ingress: string;
  absolute_url: string;
  ingress_short: string;
}
