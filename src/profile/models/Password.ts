export interface IChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface IChangePasswordResponse {
  current_password?: string[];
  new_password?: string[];
  new_password_confirm?: string[];
  non_field_errors?: string[];
}
