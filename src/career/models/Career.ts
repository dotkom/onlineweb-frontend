import { ICompany } from 'companies/models/Company';

export interface ICareerOpportunity {
  id: number;
  company: ICompany;
  title: string;
  ingress: string;
  description: string;
  start: string;
  end: string;
  featured: boolean;
  deadline: string;
  employment: IEmployment;
  location: ILocation[];
  application_link: string;
  application_email: string;
}

export interface IEmployment {
  name: JobType;
  id: number;
}

export interface ILocation {
  name: string;
  slug: string;
}

export type JobType = 'Fastjobb' | 'Deltidsjobb' | 'Sommerjobb/internship' | 'Start-up' | 'Annet';

export type TagTypes = ICompany | IEmployment | ILocation;
