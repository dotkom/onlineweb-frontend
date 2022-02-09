import React, { useState } from 'react';
import { logOut } from 'authentication/api';
import LoginView from 'authentication/components/Login';
import { getMyProfileUrl, getPaymentWalletUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './header.less';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsStaff, selectUserName } from 'authentication/selectors/authentication';

interface IProps {
  menuIsOpen?: boolean;
  closeMenu?: () => void;
}

const Login: React.FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn());

  const toggleDropdown = () => {
    if (props.menuIsOpen && props.closeMenu) {
      props.closeMenu();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isLoggedIn ? (
        <HeaderUser logout={logOut} onClick={toggleDropdown} isOpen={isOpen} />
      ) : (
        <LoginView onClick={toggleDropdown} isOpen={isOpen} />
      )}
      <Link
        href={'https://docs.google.com/forms/d/e/1FAIpQLScvjEqVsiRIYnVqCNqbH_-nmYk3Ux6la8a7KZzsY3sJDbW-iA/viewform'}
        passHref
      >
        <a target="_blank" rel="noreferrer">
          <div className={style.user}>
            <button className={style.debugButton}>!</button>
          </div>
        </a>
      </Link>
    </div>
  );
};

interface IHeaderUserProps {
  logout: () => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
  isOpen: boolean;
}

const HeaderUser = (props: IHeaderUserProps) => {
  const username = useSelector(selectUserName());
  const isStaff = useSelector(selectIsStaff());

  return (
    <div className={style.user}>
      <button onClick={props.onClick} className={style.dropdownButton} />
      <div className={style.username}>{username}</div>
      {props.isOpen && (
        <div className={style.userMenu} onClick={props.onClick}>
          <Link {...getMyProfileUrl()}>
            <a>Min side: {username}</a>
          </Link>
          {isStaff && (
            <>
              <Link href="/admin">
                <a>Adminpanel</a>
              </Link>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </>
          )}
          <Link {...getPaymentWalletUrl()}>
            <a>Saldo</a>
          </Link>
          <Link href="/contact">
            <a>Kontakt oss</a>
          </Link>
          <Link {...getMyProfileUrl()}>
            <a>Finn brukere</a>
          </Link>
          <Link href="#">
            <a onClick={props.logout}>Logg ut</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
