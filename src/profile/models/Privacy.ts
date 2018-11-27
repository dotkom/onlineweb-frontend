export interface IPrivacy {
  visible_for_other_users: boolean;
  expose_nickname: boolean;
  expose_email: boolean;
  expose_phone_number: boolean;
  expose_address: boolean;
  visible_as_attending_events: boolean;
}

export const translations: { [Key in keyof IPrivacy]: string } = {
  visible_for_other_users: 'Brukerprofil synlig for andre brukere',
  expose_nickname: 'Vis brukernavn i brukerprofil',
  expose_email: 'Vis epostadresse i brukerprofil',
  expose_phone_number: 'Vis telefonnummer i brukerprofil',
  expose_address: 'Vis adresse i brukerprofil',
  visible_as_attending_events: 'Synlig på offentlige påmeldinglister',
};
