import React, { Component, ContextType } from 'react';

import { ProfileSearchContext } from 'profile/providers/SearchFilter';

import { getGroups } from '../../api/groups';
import DoubleSlider from './DoubleSlider';
import Dropdown from './Dropdown';
import style from './search.less';

export interface IProps {}

export interface IState {
  groups: string[];
}

class Searchbar extends Component<IProps, IState> {
  public static contextType = ProfileSearchContext;
  public context!: ContextType<typeof ProfileSearchContext>;

  public state: IState = {
    groups: [],
  };

  public async componentDidMount() {
    const groups = await getGroups();
    this.setState({ groups });
  }

  public render() {
    const { search, group, range, setSearch, setGroup, setRange } = this.context;
    const { groups } = this.state;
    return (
      <form className={style.grid}>
        <input
          placeholder="Søk"
          className={style.searchInput}
          type="text"
          value={search || ''}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Dropdown selected={group} onClick={setGroup} groups={groups} />
        <DoubleSlider range={range || [1, 6]} onChange={setRange} />
      </form>
    );
  }
}

export default Searchbar;
