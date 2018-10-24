import React from 'react';
import { ISearchUser } from '../../models/User';
import style from '../../less/profile.less';
import classnames from 'classnames';

class ProfileSmall extends React.Component<{ user: ISearchUser }> {
  public render() {
    const { image, name, phone, mail } = this.props.user;
    return (
      <div className={classnames(style.smallContainer, style.gridRow)}>
        <img className={classnames(style.profileImage, style.picturePadding)} src={ image } title={ name }></img>
        <div className={style.smallContent}>
          <h3 className={style.name}>{ name }</h3>
          <p className={style.infoType}>E-post</p>
          <p className={style.infoContent}>{ mail }</p>
          <p className={style.infoType}>Telefonnummer</p>
          <p className={style.infoContent}>{ phone }</p>
        </div>
      </div>
    );
  }
}

export default ProfileSmall;
