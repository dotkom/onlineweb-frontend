import React from 'react';

import DEFAULT_USER_IMAGE from 'common/img/profile/user.png';

import { IPublicProfile } from '../../models/User';
import style from './search.less';

class ProfileSmall extends React.Component<{ user: IPublicProfile }> {
  public render() {
    const { first_name, last_name, phone_number, online_mail, image, email } = this.props.user;
    const name = `${first_name} ${last_name}`;
    const imgSrc = image || DEFAULT_USER_IMAGE;
    const displayEmail = online_mail ? `${online_mail}@online.ntnu.no` : email;
    return (
      <div className={style.smallProfile}>
        <img src={imgSrc} title={name} />
        <div>
          <h3 className={style.name}>{name}</h3>
          <p className={style.infoType}>E-post: </p>
          <p>{displayEmail}</p>
          <p className={style.infoType}>Telefonnummer: </p>
          <p>{phone_number}</p>
        </div>
      </div>
    );
  }
}

export default ProfileSmall;
