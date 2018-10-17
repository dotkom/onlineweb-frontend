export interface RuleBundle {
  description: String;
  field_of_study_rules: [FieldOfStudyRule];
  grade_rules: [GradeRule];
  user_group_rules: [UserGroupRule];
}

export interface GradeRule {}

export interface UserGroupRule {}

export interface FieldOfStudyRule {
  field_of_study: number; // Positive Integer
}
