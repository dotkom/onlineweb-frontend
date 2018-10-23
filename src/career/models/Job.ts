import { ICompanyImage } from './CompanyImage';
import { ITags } from './Tag';
import { IsoDateTime } from 'common/models/Date';
import { IApiCompany } from 'core/models/Company';

export interface IJob {
  locations: string[];
  deadline: string;
  companyImage: ICompanyImage;
  companyName: string;
  companyDescription: string;
  companyId: number;
  description: string;
  title: string;
  ingress: string;
  type: JobType;
  id: number;
  featured: boolean;
  tags?: ITags;
}

export interface IApiJob {
  location: [{ slug: string, name: string }];
  employment: { id: number, name: JobType };
  deadline: IsoDateTime;
  featured: boolean;
  end: IsoDateTime;
  start: IsoDateTime;
  description: string;
  ingress: string;
  title: string;
  id: number;
  company: IApiCompany;
}

export type JobType = 'Fastjobb' | 'Deltidsjobb' | 'Sommerjobb/internship' | 'Start-up' | 'Annet';
