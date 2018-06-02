import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="profile-container">
        <img
          className="profile-image"
          src="https://folk.ntnu.no/oleast/me.jpg"
        ></img>
      </div>
    );
  }
}

export default Header;
