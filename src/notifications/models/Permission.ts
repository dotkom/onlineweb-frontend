export interface IPermission {
  id: number;
  permission_type: string;
  permission_type_display: string;
  force_email: boolean;
  force_push: boolean;
  allow_email: boolean;
  allow_push: boolean;
  default_value_email: boolean;
  default_value_push: boolean;
}
