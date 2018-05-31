import { StaticUrl } from 'common/models/Url';

export interface IResource {
  title: string;
  description: string;
  image?: { url: StaticUrl };
};
