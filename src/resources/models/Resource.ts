import IResponsiveImage from 'common/models/ResponsiveImage';

export interface IResource {
  id: number;
  title: string;
  description: string;
  image: IResponsiveImage | null;
  active: boolean;
  priority?: number;
}
