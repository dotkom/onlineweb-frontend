import React from 'react';
import ProfileSmall from './ProfileSmall';
import { ISearchUser } from '../../models/User';
import { IQueryObject } from 'common/utils/queryString';
import { searchUsers } from '../../api/search';
import { SearchFilter } from '../../models/Search';
import { IGroup } from 'core/models/Group';
import Searchbar from './Searchbar';
import style from './search.less';

export interface IProps {
  readonly query: IQueryObject;
}

export interface IState extends IProps {
  readonly users: ISearchUser[];
  readonly filter: SearchFilter;
}

class Search extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      query: props.query,
      users: [],
      filter: new SearchFilter(),
    };
  }

  public async componentWillMount() {
    const { filter } = this.state;
    const users = await searchUsers(filter);
    this.setState({ users });
  }

  public setName(name: string): boolean {
    const { filter } = this.state;
    const validation = filter.setName(name);
    this.setState({ filter });
    return validation;
  }

  public setGroup(group: IGroup): boolean {
    const { filter } = this.state;
    const validation = filter.setGroup(group);
    this.setState({ filter });
    return validation;
  }

  public setYear(range: [number, number]): boolean {
    const { filter } = this.state;
    const validation = filter.setYear(range);
    this.setState({ filter });
    return validation;
  }

  public render() {
    const { users, filter } = this.state;
    return (
      <>
        <Searchbar
          setName={(s) => this.setName(s)}
          setGroup={(s) => this.setGroup(s)}
          setYear={(s) => this.setYear(s)}
          { ...filter.format }
        />
        <div className={style.smallProfileGrid}>
          { users.map((user) =>
            <ProfileSmall user={user} />)
          }
        </div>
      </>
    );
  }
}

export default Search;

