import React from 'react';
import user from 'common/img/profile/user.png';
import style from '../../less/profile.less';

class Header extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <img
          className={style.profileImage}
          src={user}
        ></img>
      </div>
    );
  }
}

export default Header;
