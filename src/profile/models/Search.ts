import { IGroup } from 'core/models/Group';

/** Because Object Oriented Programming is (the) shit, right? */

export interface ISearchFilter {
  /** Search for username, ntnu-name and nickname */
  name?: string;
  /** Selected group from dropdown */
  group?: string;
  /** Year slider, from 1 to 6 */
  year?: [number, number];
}

export class SearchFilter {
  private static NAME_VALIDATOR = /[A-Za-z0-9]{3,32}/g;

  /** Search for username, ntnu-name and nickname */
  private name: string | null;
  /** Selected group from dropdown */
  private group: IGroup | null;
  /** Year slider, from 1 to 6 */
  private year: [number, number];

  /**
   * The constructor of this Class is designed to set the initial state of the Object, and only that.
   */
  constructor() {
    this.name = null;
    this.group = null;
    this.year = [1, 6];
  }

  public get getName() {
    return this.name;
  }

  public get getGroup() {
    return this.group;
  }

  public get getYear() {
    return this.year;
  }

  /**
   * @summary Set the name to filter on.
   * @description This method sets the name of the User.
   * It tests the name based on a regex to see if it matches the allowed kind of names.
   * The returns wether it was set or not.
   * @param {string} name A string to filter the API search on.
   * @returns {boolean} Wether the name was set or not.
   */
  public setName(name: string): boolean {
    this.name = name;
    if (SearchFilter.NAME_VALIDATOR.test(name)) {
      return true;
    }
    return false;
  }

  public setGroup(group: IGroup): boolean {
    this.group = group;
    return true;
  }

  public setYear(range: [number, number]): boolean {
    const sorted = range;
    if (sorted[0] >= 1 && sorted[1] <= 6) {
      this.year = sorted;
      return true;
    }
    return false;
  }

  /**
   * @summary Returns the current state of the filter.
   * @description The filter should not be sent directly to the API as an Object based on a class.
   * This method has the goal of formatting the Object in a way that fits as query parameters in the URL of the API.
   * Fields which are in an initial state are represented as not present, and will not by put into the query parameters.
   * @returns {ISearchFilter} A representation of the current state of the object better fit for API params.
   */
  public get format(): ISearchFilter {
    return {
      name: this.name !== null ? this.name : undefined,
      group: this.group !== null ? this.group.name : undefined,
      year: this.year !== [1, 6] ? this.year : undefined,
    };
  }
}
