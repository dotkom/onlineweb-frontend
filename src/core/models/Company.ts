import { ICompanyImage } from 'career/models/CompanyImage';
import IImage from 'common/models/Image';

export interface ICompany {
  name: string;
  website: string;
  image: IImage;
}

/*export default class Company implements ICompany {
  public name: String
  public website: String
  public image: String

  public constructor(c: any) {
    this.name = c.name
    this.website = c.website
    this.image = c.image
  }
}*/

export interface IApiCompany {
  readonly id: number;
  readonly name: string;
  readonly short_description: string; // TextField model?
  readonly long_description: string; // TextField model?
  readonly image: ICompanyImage; // Image, or StaticContent model?
  readonly site: string; // URL model?
  readonly email_address: string; // Email model?
  readonly phone_number: string; // Phone model?
}
