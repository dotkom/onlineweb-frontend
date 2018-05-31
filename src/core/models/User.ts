
export interface IUser {
  name: String,
  firstName: String,
  lastName: String,

  fullName: String,
  displayName: String,
}

export interface IPublicUser extends IUser {

}

export interface IOnlineUser extends IUser {
  rfid: String,
}

/**
 * OnlineUser
 */
/*export class User implements IOnlineUser {
  public name: string
  public firstName: string
  public lastName: string
  public rfid: string

  public constructor(u: IOnlineUser) {
    Object.assign(this, u)
  } 

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  public get displayName(): string {
    return this.name
  }
}*/
