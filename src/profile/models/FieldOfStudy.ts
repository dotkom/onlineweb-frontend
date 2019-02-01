export enum FieldOfStudy {
  GUEST = 0,
  BIT = 1,

  /** 10-30 are reserved for masters */
  SOFTWARE_SYSTEMS = 10,
  DATABASES_AND_SEARCH = 11,
  ALGORITHMS_AND_COMPUTERS = 12,
  GAME_TECHNOLOGY = 13,
  ARTIFICIAL_INTELLIGENCE = 14,
  HEALTH_INFORMATICS = 15,
  INTERACTION_DESIGN = 16,
  OTHER_MASTERS = 30,

  SOCIAL_MEMBER = 40,
  PHD = 80,
  INTERNATIONAL = 90,
  OTHER = 100,
}

export const getFieldOfStudyString = (fos: FieldOfStudy): string => {
  switch (fos) {
    case FieldOfStudy.GUEST:
      return 'Gjest';
    case FieldOfStudy.BIT:
      return 'Bachelor i Informatikk';
    case FieldOfStudy.SOFTWARE_SYSTEMS:
      return 'Programvaresystemer';
    case FieldOfStudy.DATABASES_AND_SEARCH:
      return 'Databaser og søk';
    case FieldOfStudy.ALGORITHMS_AND_COMPUTERS:
      return 'Algoritmer og datamaskiner';
    case FieldOfStudy.GAME_TECHNOLOGY:
      return 'Spillteknologi';
    case FieldOfStudy.ARTIFICIAL_INTELLIGENCE:
      return 'Kunstig intelligens';
    case FieldOfStudy.HEALTH_INFORMATICS:
      return 'Helseinformatikk';
    case FieldOfStudy.INTERACTION_DESIGN:
      return 'Interaksjonsdesign, spill- og læringsteknologi';
    case FieldOfStudy.OTHER_MASTERS:
      return 'Annen mastergrad';
    case FieldOfStudy.SOCIAL_MEMBER:
      return 'Sosialt medlem';
    case FieldOfStudy.PHD:
      return 'PhD';
    case FieldOfStudy.INTERNATIONAL:
      return 'International';
    case FieldOfStudy.OTHER:
      return 'Annet Onlinemedlem';
    default:
      return 'Ikke funnet';
  }
};
