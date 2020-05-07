import { Button } from '@dotkomonline/design-system';
import React, { FC } from 'react';

import { logIn, logOut } from 'authentication/api';
import { getMyProfileUrl, getProfileSettingsUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './UserMenu.less';
import { useSelector } from 'core/redux/hooks';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

interface IProps {
  onItemClick: () => void;
}

export const UserMenu: FC<IProps> = ({ onItemClick }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn());

  const handleLogIn = async () => {
    await logIn();
    onItemClick();
  };

  const handleLogOut = async () => {
    await logOut();
    onItemClick();
  };

  return isLoggedIn ? (
    <div className={style.userMenu}>
      <Link {...getMyProfileUrl()}>
        <a className={style.link} onClick={onItemClick}>
          Profil
        </a>
      </Link>
      <Link {...getProfileSettingsUrl()}>
        <a className={style.link} onClick={onItemClick}>
          Innstillinger
        </a>
      </Link>
      <Button onClick={handleLogOut}>Logg ut</Button>
    </div>
  ) : (
    <div className={style.userMenu}>
      <Button type="submit" onClick={handleLogIn}>
        Logg inn
      </Button>
    </div>
  );
};
