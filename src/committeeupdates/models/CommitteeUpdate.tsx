export interface ICommitteeUpdateGroupImage {
  thumb: string;
}

export interface ICommitteeUpdateGroup {
  name_short: string;
  name_long: string;
  email: string;
  group_type: string;
  verbose_type: string;
  id: number;
  image: ICommitteeUpdateGroupImage | null;
}

export interface ICommitteeUpdate {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  group: ICommitteeUpdateGroup;
}
