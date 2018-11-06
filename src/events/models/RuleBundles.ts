export interface IRuleBundle {
  id: number;
  description: string;
  field_of_study_rules: IFieldOfStudyRule[];
  grade_rules: IGradeRule[];
  user_group_rules: IUserGroupRule[];
  rule_strings: string[];
}

export interface IGradeRule {}

export interface IUserGroupRule {}

export interface IFieldOfStudyRule {
  field_of_study: number; // Positive Integer
}
