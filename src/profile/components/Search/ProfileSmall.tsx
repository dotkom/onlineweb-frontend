import React from 'react';
import { ISearchUser } from '../../models/User';
import style from './search.less';

class ProfileSmall extends React.Component<{ user: ISearchUser }> {
  public render() {
    const { image, name, phone, mail } = this.props.user;
    return (
      <div className={style.smallProfile}>
        <img src={image} title={name} />
        <div>
          <h3 className={style.name}>{name}</h3>
          <p className={style.infoType}>E-post: </p>
          <p>{mail}</p>
          <p className={style.infoType}>Telefonnummer: </p>
          <p>{phone}</p>
        </div>
      </div>
    );
  }
}

export default ProfileSmall;
