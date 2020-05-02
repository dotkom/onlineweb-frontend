import IResponsiveImage from 'common/models/ResponsiveImage';

export interface IOfflineIssue {
  description: string;
  id: number;
  issue: string;
  release_date: string;
  title: string;
  image?: IResponsiveImage;
}
