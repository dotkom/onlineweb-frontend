import { Permission } from './Permission';

export interface IGroup {
  name: string;
  permissions: Permission[];
}
