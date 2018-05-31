export type RuleBundle = {
  description: String
  field_of_study_rules: [FieldOfStudyRule]
  grade_rules: [GradeRule]
  user_group_rules: [UserGroupRule]
}

export type GradeRule = {}

export type UserGroupRule = {}

export type FieldOfStudyRule = {
  field_of_study: number // Positive Integer
}
