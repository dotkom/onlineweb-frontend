import IResponsiveImage from 'common/models/ResponsiveImage';

export interface ICompany {
  id: number;
  created_date: string;
  name: string;
  short_description: string;
  long_description: string;
  image: IResponsiveImage;
  site: string;
  email_address: string;
  phone_number: string;
  event_count: number;
  career_opportunity_count: number;
}
