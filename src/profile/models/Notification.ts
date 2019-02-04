export interface INotificationOption {
  articles: boolean;
  events: boolean;
  offlines: boolean;
  feedback: boolean;
}

export interface INotificationSetting extends INotificationOption {
  allowNotifications: boolean;
  subscription: boolean;
}

export const optionStrings: { [Key in keyof INotificationSetting]: string } = {
  articles: 'Nye Artikler',
  events: 'Arrangementpåmelding',
  offlines: 'Nye Offline',
  feedback: 'Nye tilbakemeldingsskjemaer',
  allowNotifications: 'Tillat notifikasjoner på dette nettstedet',
  subscription: 'Registrer denne enheten for å motta notifikasjoner',
};
