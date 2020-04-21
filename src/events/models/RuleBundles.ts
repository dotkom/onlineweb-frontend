export interface IRuleBundle {
  id: number;
  description: string;
  field_of_study_rules: number[];
  grade_rules: number[];
  user_group_rules: number[];
  rule_strings: string[];
}

export interface IFieldOfStudyRule {
  id: number;
  offset: number;
  field_of_study: number;
  field_of_study_display: string;
}

export interface IGradeRule {
  id: number;
  offset: number;
  grade: number;
}

export interface IUserGroupRule {
  id: number;
  offset: number;
  group: number;
}
