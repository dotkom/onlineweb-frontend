import React, { useContext } from 'react';

import DEFAULT_USER_IMAGE from 'common/img/profile/user.png';
import { UserProfileContext } from 'profile/providers/UserProfile';

import style from '../../less/profile.less';

export const Header = () => {
  const { user } = useContext(UserProfileContext);
  if (!user) {
    return null;
  }
  const fullName = `${user.first_name} ${user.last_name}`;
  const imgSrc = user.image || DEFAULT_USER_IMAGE;
  return (
    <div className={style.header}>
      <img className={style.profileImage} src={imgSrc} />
      <h1>{fullName}</h1>
    </div>
  );
};

export default Header;
