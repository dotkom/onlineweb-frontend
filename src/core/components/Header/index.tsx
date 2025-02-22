import classnames from 'classnames';
import React, { useState } from 'react';

import { DOMAIN } from 'common/constants/endpoints';
import * as appUrls from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './header.less';
import HeaderLogo from './HeaderLogo';
import HeaderLogin from './Login';
import MenuButton from './MenuButton';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';
import { useSelector } from 'react-redux';


export interface IState {
  isOpen: boolean;
}
const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleMenu = () => setIsOpen( !isOpen );

  const closeMenu = () => setIsOpen( false);

  
  return (
    <header className={style.header}>
        <div className={style.grid}>
          <MenuButton isOpen={isOpen} onClick={toggleMenu} />
          <HeaderLogo onClick={closeMenu} />
          {isLoggedIn ? (
            <div className={classnames(style.links, { [style.dropdownMode]: isOpen })} onClick={closeMenu}>
            <Link {...appUrls.getEventsUrl()}>
              <a>Arrangementer</a>
            </Link>
            <Link {...appUrls.getCareerOpportunitiesUrl()}>
              <a>Jobbannonser</a>
            </Link>
            <Link {...appUrls.getHobbyGroupsUrl()}>
              <a>Interessegrupper</a>
            </Link>
            <a href={'https://wiki.online.ntnu.no'}>Wiki</a>
            <a href={`${DOMAIN}/webshop/`}>Webshop</a>
            </div>
          ) : (
            <div className={classnames(style.links, { [style.dropdownMode]: isOpen })} onClick={closeMenu}>
              <Link {...appUrls.getCompanyNewUrl()}>
                <a>For bedrifter</a>
              </Link>
              <Link {...appUrls.getEventsUrl()}>
                <a>Arrangementer</a>
              </Link>
              <Link {...appUrls.getCareerOpportunitiesUrl()}>
                <a>Karriere</a>
              </Link>
              <Link {...appUrls.getHobbyGroupsUrl()}>
                <a>Interessegrupper</a>
              </Link>
              <a href={`${DOMAIN}/wiki/`}>Wiki</a>  
            </div>
            )}
            <HeaderLogin menuIsOpen={isOpen} closeMenu={closeMenu} />
          </div>
      </header>
  )
} 
    
export default Header;
