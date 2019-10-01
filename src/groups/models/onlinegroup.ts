import ResponsiveImage from 'common/models/ResponsiveImage';

export interface IOnlineGroup {
  image: ResponsiveImage | null;
  name_short: string;
  name_long: string;
  description_long: string;
  description_short: string;
  email: string;
  created: string;
  group_type: string;
  verbose_type: string;
  group: number;
  members: number[];
}
