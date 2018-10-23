
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

export interface ITagWrapper {
  [index: string]: ITag;
}

export interface ITags {
  [index: string]: ITagWrapper;
}

export type TagType = 'companies' | 'locations' | 'jobTypes';
