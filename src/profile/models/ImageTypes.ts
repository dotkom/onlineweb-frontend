export interface IType {
  [index: string]: TypeValue;
}

export interface IMedalUrl {
  [index: string]: MedalUrlValue;
}

export type MedalUrlKey = 'leder' | 'nestleder' | 'redaktør' | 'medlem' | 'økonomiansvarlig';
export type MedalUrlValue = 'king-crown' | 'prince-crown' | 'offline-hat' | 'king-crown' | 'bankom-hat-gold';
export type TypeValue = 'github-dark' | 'linkedin-dark' | 'home-dark';
export type TypeIndex = 'Github' | 'Linkedin' | 'Hjemmeside';
