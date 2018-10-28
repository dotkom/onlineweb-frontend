export interface INotificationOption {
  articles: boolean;
  events: boolean;
  offlines: boolean;
  feedback: boolean;
}

export const translations: { [Key in keyof INotificationOption | 'allow_notifications']: string } = {
  articles: 'Nye Artikler',
  events: 'Arrangementpåmelding',
  offlines: 'Nye Offline',
  feedback: 'Nye tilbakemeldingsskjemaer',
  allow_notifications: 'Tillat notifikasjoner på dette nettstedet',
};
