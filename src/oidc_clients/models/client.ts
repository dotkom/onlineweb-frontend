import { IResponseType } from './responsetype';

export interface IOidcClientOwner {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

export interface IOidcClient {
  id: number;
  client_id: string;
  client_type: string;
  name: string;
  owner?: IOidcClientOwner;
  data_created: string;
  website_url: string;
  terms_url: string;
  contact_email: string;
  logo: string;
  require_consent: boolean;
  reuse_consent: boolean;
  scope: string[];
  response_types: IResponseType[];
}
