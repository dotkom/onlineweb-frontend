
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
};

export type TagWrapper = {
  [index: string]: ITag;
};

export type Tags = {
  [index: string]: TagWrapper;
}

export type TagType = 'companies' | 'locations' | 'jobTypes'
