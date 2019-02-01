export interface INotificationOption {
  articles: boolean;
  events: boolean;
  offlines: boolean;
  feedback: boolean;
}

export const optionStrings: { [Key in keyof INotificationOption | 'allowNotifications']: string } = {
  articles: 'Nye Artikler',
  events: 'Arrangementpåmelding',
  offlines: 'Nye Offline',
  feedback: 'Nye tilbakemeldingsskjemaer',
  allowNotifications: 'Tillat notifikasjoner på dette nettstedet',
};
