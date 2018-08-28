import React from 'react';
import user from 'common/img/profile/user.png';
class Header extends React.Component {
  render() {
    return (
      <div className="profile-container">
        <img
          className="profile-image"
          src={user}
        ></img>
      </div>
    );
  }
}

export default Header;
