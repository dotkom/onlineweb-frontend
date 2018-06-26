import React from 'react';
import { ISearchUser } from '../../models/User';

class ProfileSmall extends React.Component<{ user: ISearchUser }> {
  render() {
    const { image, name, phone, mail } = this.props.user;
    return (
      <div className="profile-small-container grid-row">
        <img className="profile-image profile-picture-padding" src={ image } title={ name }></img>
        <div className="profile-small-content">
          <h3 className="profile-small-name">{ name }</h3>
          <p className="profile-info-type">E-post</p>
          <p className="profile-info-content">{ mail }</p>
          <p className="profile-info-type">Telefonnummer</p>
          <p className="profile-info-content">{ phone }</p>
        </div>
      </div>
    );
  }
}

export default ProfileSmall;