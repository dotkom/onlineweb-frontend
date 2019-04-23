import IResponsiveImage from 'common/models/ResponsiveImage';

export interface ICompany {
  readonly id: number;
  readonly name: string;
  readonly short_description: string; // TextField model?
  readonly long_description: string; // TextField model?
  readonly image: IResponsiveImage; // Image, or StaticContent model?
  readonly site: string; // URL model?
  readonly email_address: string; // Email model?
  readonly phone_number: string; // Phone model?
}
