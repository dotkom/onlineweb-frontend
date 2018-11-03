import React from 'react';
import user from 'common/img/profile/user.png';
import style from '../../less/profile.less';

class Header extends React.Component<{ name: string }> {
  public render() {
    const { name } = this.props;
    return (
      <div className={style.header}>
        <img className={style.profileImage} src={user} />
        <h1>{name}</h1>
      </div>
    );
  }
}

export default Header;
