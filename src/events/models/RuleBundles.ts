export interface IRuleBundle {
  description: String;
  field_of_study_rules: IFieldOfStudyRule[];
  grade_rules: IGradeRule[];
  user_group_rules: IUserGroupRule[];
}

export interface IGradeRule {}

export interface IUserGroupRule {}

export interface IFieldOfStudyRule {
  field_of_study: number; // Positive Integer
}
