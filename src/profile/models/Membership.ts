export interface IMembershipResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<string>;
}

export interface IMembershipApplication {
  id: number;
  field_of_study: string;
  created: string;
  processed: boolean;
  processed_date: string;
  approved: boolean;
  message: string;
  new_expiry_date: string;
  started_date: string;
}
