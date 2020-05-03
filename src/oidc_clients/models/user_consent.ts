import { DateTime } from 'luxon';
import { IOidcClient } from './client';

export interface IUserConsent {
  id: number;
  date_given: DateTime;
  expires_at: DateTime;
  client: IOidcClient;
  scope: string[];
  has_expired: boolean;
}
