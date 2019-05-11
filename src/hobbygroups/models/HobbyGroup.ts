import IResponsiveImage from 'common/models/ResponsiveImage';

export interface IHobbyGroup {
  id: number;
  title: string;
  description: string;
  image: IResponsiveImage | null;
  read_more_link: string;
  priority?: number;
  active: boolean;
}
