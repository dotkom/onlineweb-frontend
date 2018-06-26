import React, { Component } from 'react';
import { IGroup } from "core/models/Group";
import { ISearchFilter } from '../../models/Search';

export interface IProps extends ISearchFilter {
  setName: (s: string) => boolean;
  setGroup: (g: IGroup) => boolean;
  setYear: (y: [number, number]) => boolean;
}

class Searchbar extends Component<IProps> {
  public render() {
    const { name, group, year, setName, setGroup, setYear } = this.props;
    return(
      <form className="profile-search-grid">
        <input className="profile-search-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="profile-search-field" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <input className="profile-search-field" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </form>
    )
  }
}

export default Searchbar;
