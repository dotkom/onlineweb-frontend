import { IUser, Email, FieldOfStudy } from 'core/models/User';
import { IGroup } from 'core/models/Group';
import { Permission } from 'core/models/Permission';

export interface IAuthUser extends IUser {
  field_of_study: FieldOfStudy;
  permissions: Permission[];
}

export class AuthUser implements IAuthUser {
  public first_name: string
  public last_name: string
  public username: string
  public email: Email
  public groups: IGroup[]
  public field_of_study: FieldOfStudy
  public permissions: Permission[]
  
  constructor(u: IAuthUser) {
    this.first_name = u.first_name;
    this.last_name = u.last_name;
    this.username = u.username;
    this.email = u.email
    this.groups = u.groups;
    this.field_of_study = u.field_of_study;
    this.permissions = u.permissions;
  }

  /**
   * Get all the permissions of this user as a single array of Permission strings
   * @returns {Permission[]}
   */
  public getAllPermissions(): Permission[] {
    return this.groups
      /** Create an Permission[][] */
      .map((group: IGroup): Permission[] => group.permissions)
      /** Join the given arrays to one array: Permission[] */
      .reduce((accumulator, current) => accumulator.concat(current))
      /** Add the other, non-group related permissions on the user */
      .concat(this.permissions)
      /** Remove duplicates by filtering */
      .filter((permission, index, array) => array.indexOf(permission) === index)
  }

  /**
   * Returns wether this user has the given permission or group permission.
   * @param {IGroup | Permission} authentication Permission string or a Group to evaluate against
   * @returns {boolean} Boolean value for is the user has the permission
   */
  public hasPermission(authentication: IGroup | Permission): boolean {
    /** Check if authetication is a string, it is then a single permission */
    if (typeof authentication === 'string') {
      return this.getAllPermissions()
        /** Check if the given Permission[] includes the required authentication */
        .includes(authentication)

    /** If authentication is not a string */
    } else if (authentication.name) {
      return this.groups
        /** Map to an array of group names */
        .map((group) => group.name)
        /** Check if the given groups name is in the group names for the user */
        .includes(authentication.name)
    } else {
      /** If wrong argument is given, return false */
      return false;
    }
  }
}
