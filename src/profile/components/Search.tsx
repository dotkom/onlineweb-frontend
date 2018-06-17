import React from 'react';
import ProfileSmall from './ProfileSmall';
import { ISearchUser } from '../models/User';
import { IQueryObject } from 'common/utils/queryString';

export interface Props {
  query: IQueryObject;
}

export interface State extends Props {
  users: ISearchUser[]
}

class Search extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      query: props.query,
      users: [
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
        { name: 'Ole Anders Stokker', phone: '47684466', mail: 'oleast@stud.ntnu.no', image: 'https://folk.ntnu.no/oleast/me.jpg' },
      ]
    };
  }

  componentWillMount() {
    
  }

  render() {
    const { users } = this.state;
    return (
        <div className="profile-search">
          { users.map(user => 
            <ProfileSmall user={user} />)
          }
        </div>
    );
  }
}
  
export default Search;
  