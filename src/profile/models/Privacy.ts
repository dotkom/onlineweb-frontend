export interface IPrivacy {
  visible_for_other_users: boolean;
  expose_nickname: boolean;
  expose_email: boolean;
  expose_phone_number: boolean;
  expose_address: boolean;
}

export const translations: { [Key in keyof IPrivacy]: string } = {
  visible_for_other_users: 'Synlig for andre brukere',
  expose_nickname: 'Vis brukernavn',
  expose_email: 'Vis epostadresse',
  expose_phone_number: 'Vis telefonnummer',
  expose_address: 'Vis adresse',
};
