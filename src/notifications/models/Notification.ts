export interface INotification {
  id: number;
  created_date: string;
  sent_email: boolean;
  sent_push: boolean;
  from_mail: boolean;
  title: string;
  body: string;
  url: string;
  tag: string | null;
  icon: string;
  require_interaction: boolean;
  renotify: boolean;
  silent: boolean;
}
