import React, { useContext } from 'react';

import { ProfilePageContext } from 'profile/providers/ProfilePage';

import style from '../../less/profile.less';

export const Header = () => {
  const { first_name, last_name } = useContext(ProfilePageContext);
  const fullName = `${first_name} ${last_name}`;
  return (
    <div className={style.header}>
      <h1>{fullName}</h1>
    </div>
  );
};

export default Header;
