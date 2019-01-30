import React from 'react';

import image from 'common/img/profile/user.png';

import { ISearchUser } from '../../models/User';
import style from './search.less';

class ProfileSmall extends React.Component<{ user: ISearchUser }> {
  public render() {
    const { first_name, last_name, phone_number, online_mail } = this.props.user;
    const name = `${first_name} ${last_name}`;
    return (
      <div className={style.smallProfile}>
        <img src={image} title={name} />
        <div>
          <h3 className={style.name}>{name}</h3>
          <p className={style.infoType}>Online E-post: </p>
          <p>{online_mail}</p>
          <p className={style.infoType}>Telefonnummer: </p>
          <p>{phone_number}</p>
        </div>
      </div>
    );
  }
}

export default ProfileSmall;
