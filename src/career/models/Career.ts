import { IApiCompany } from 'core/models/Company';

export interface ICareerOpportunity {
  id: number;
  company: IApiCompany;
  title: string;
  ingress: string;
  description: string;
  start: string;
  end: string;
  featured: boolean;
  deadline: string;
  employment: IEmployment;
  location: ILocation[];
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

export interface ISelectable<T> {
  value: T;
  selected: boolean;
}

export type TagTypes = IApiCompany | IEmployment | ILocation;
