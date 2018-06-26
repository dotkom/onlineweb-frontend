import React from 'react';
import ProfileSmall from './ProfileSmall';
import { ISearchUser } from '../../models/User';
import { IQueryObject } from 'common/utils/queryString';
import { searchUsers } from '../../api/search';
import { SearchFilter } from '../../models/Search';
import { IGroup } from 'core/models/Group';
import Searchbar from './Searchbar';
import './search.less'

export interface Props {
  readonly query: IQueryObject;
}

export interface State extends Props {
  readonly users: ISearchUser[]
  readonly filter: SearchFilter;
}

class Search extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      query: props.query,
      users: [],
      filter: new SearchFilter()
    };
  }

  public async componentWillMount() {
    const { filter } = this.state;
    const users = await searchUsers(filter);
    this.setState({ users })
  }

  setName(name: string): boolean {
    let { filter } = this.state;
    const validation = filter.setName(name)
    this.setState({ filter })
    return validation;
  }

  setGroup(group: IGroup): boolean {
    let { filter } = this.state;
    const validation = filter.setGroup(group);
    this.setState({ filter })
    return validation;
  }

  setYear(range: [number, number]): boolean {
    let { filter } = this.state;
    const validation = filter.setYear(range)
    this.setState({ filter })
    return validation;
  }

  render() {
    const { users, filter } = this.state;
    return (
      <> 
        <Searchbar
          setName={(s) => this.setName(s)}
          setGroup={this.setGroup}
          setYear={this.setYear}
          { ...filter.format }
        />
        <div className="profile-search grid">
          { users.map(user => 
            <ProfileSmall user={user} />)
          }
        </div>
      </>
    );
  }
}
  
export default Search;
  