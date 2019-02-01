import React, { useContext } from 'react';

import DEFAULT_USER_IMAGE from 'common/img/profile/user.png';
import { ProfilePageContext } from 'profile/providers/ProfilePage';

import style from '../../less/profile.less';

export const Header = () => {
  const { first_name, last_name, image } = useContext(ProfilePageContext);
  const fullName = `${first_name} ${last_name}`;
  const imgSrc = image || DEFAULT_USER_IMAGE;
  return (
    <div className={style.header}>
      <img className={style.profileImage} src={imgSrc} />
      <h1>{fullName}</h1>
    </div>
  );
};

export default Header;
