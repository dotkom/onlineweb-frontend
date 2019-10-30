import IResponsiveImage, { DEFAULT_EVENT_IMAGE } from 'common/models/ResponsiveImage';

export interface ICompany {
  readonly id: number;
  readonly name: string;
  readonly short_description: string;
  readonly long_description: string;
  readonly image: IResponsiveImage;
  readonly site: string;
  readonly email_address: string;
  readonly phone_number: string;
}

export const mockCompany: ICompany = {
  id: 0,
  name: 'Generic IT Company',
  short_description: 'We do IT stuff, please work for us',
  long_description: 'Lorem Ipsum Dolor Sit Ahmed',
  image: DEFAULT_EVENT_IMAGE,
  site: 'https://online.ntnu.no',
  email_address: 'kontakt@online.ntnu.no',
  phone_number: '123 45 678',
}