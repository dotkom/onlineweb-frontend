
export interface ITag {
  id: number;
  name: string;
  display: boolean;
  deadline?: number;
}

export interface ITags {
  companies: TagWrapper | {};
  locations: TagWrapper | {};
  jobTypes: TagWrapper | {};
  deadlines?: any;
}

export interface TagWrapper {
  [index: string]: ITag;
}

export interface Tags {
  [index: string]: TagWrapper;
}

export type TagType = 'companies' | 'locations' | 'jobTypes';
