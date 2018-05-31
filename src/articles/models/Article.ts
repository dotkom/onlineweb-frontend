import IImage from 'common/models/Image';

export interface IArticle {
  articleUrl: string
  heading: string
  image: IImage
  ingress: string
  absolute_url: string
  ingress_short: string
}