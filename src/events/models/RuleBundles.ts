export interface IRuleBundle {
  id: number;
  description: string;
  field_of_study_rules: FieldOfStudyRule[];
  grade_rules: GradeRule[];
  user_group_rules: UserGroupRule[];
  rule_strings: string[];
}

export type GradeRule = number;

// Do we ever use this? What is the type?
export type UserGroupRule = void;

export type FieldOfStudyRule = number;
