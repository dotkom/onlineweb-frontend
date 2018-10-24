
export interface ITag {
  id: number;
  name: string;
  display: boolean;
  deadline?: number;
}

export interface ITagWrapper {
  [index: string]: ITag;
}

export interface ITags {
  [index: string]: ITagWrapper;
}

export type TagType = 'companies' | 'locations' | 'jobTypes';
