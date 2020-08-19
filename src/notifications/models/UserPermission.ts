export interface IUserPermission {
  id: number;
  permission: number;
  user: number;
  allow_email: boolean;
  allow_push: boolean;
}

export interface IUpdateUserPermission {
  allow_email: boolean;
  allow_push: boolean;
}
