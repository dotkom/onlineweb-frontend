import { Logo } from '@dotkomonline/design-system';
import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';

import style from './PageHeader.less';
import {
  getEventsUrl,
  getCareerOpportunitiesUrl,
  getArticlesUrl,
  getCompaniesUrl,
  getOfflinesUrl,
  getContributionsUrl,
  getHobbyGroupsUrl,
  getMyProfileUrl,
  getFrontPageUrl,
  getProfileSearchUrl,
} from 'core/appUrls';

import { Link } from '../Router';
import { Hamburger } from './Hamburger';
import { UserButton } from './UserButton';
import { UserMenu } from './UserMenu';
import { IAuthProfile } from 'authentication/models/User';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';
import { useSelector } from 'core/redux/hooks';

interface BaseLink {
  title: string;
  shouldDisplay?: (isLoggedIn: boolean, user: IAuthProfile | null) => boolean;
}

interface InternalLink extends BaseLink {
  mode: 'internal';
  href: string;
  as: string;
}

interface ExternalLink extends BaseLink {
  mode: 'external';
  href: string;
}

type PageLink = ExternalLink | InternalLink;

export const LINKS: PageLink[] = [
  { title: 'Arrangementer', mode: 'internal', ...getEventsUrl() },
  { title: 'Karriere', mode: 'internal', ...getCareerOpportunitiesUrl() },
  { title: 'Artikler', mode: 'internal', ...getArticlesUrl() },
  { title: 'Bedrifter', mode: 'internal', ...getCompaniesUrl() },
  { title: 'Offline', mode: 'internal', ...getOfflinesUrl() },
  { title: 'Bidra', mode: 'internal', ...getContributionsUrl() },
  { title: 'Interessegrupper', mode: 'internal', ...getHobbyGroupsUrl() },
  { title: 'Profil', mode: 'internal', ...getMyProfileUrl(), shouldDisplay: (isLoggedIn) => isLoggedIn },
  { title: 'Brukersøk', mode: 'internal', ...getProfileSearchUrl(), shouldDisplay: (isLoggedIn) => isLoggedIn },
  { title: 'Wiki', mode: 'external', href: 'https://online.ntnu.no/wiki' },
  { title: 'Webshop', mode: 'external', href: 'https://online.ntnu.no/webshop' },
  {
    title: 'Kvittering',
    mode: 'external',
    href: 'https://kvittering.online.ntnu.no',
    shouldDisplay: (isLoggedIn) => isLoggedIn,
  },
  { title: 'Fadderuker', mode: 'external', href: 'https://online.ntnu.no/splash' },
  {
    title: 'Dashboard',
    mode: 'external',
    href: 'https://online.ntnu.no/dashboard',
    shouldDisplay: (isLoggedIn, user) => (isLoggedIn && user?.staff) || false,
  },
  { title: 'Søk komité', mode: 'external', href: 'https://opptak.online' },
];

export const PageHeader = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const user = useSelector((state) => state.authentication.user);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const transition = useTransition(isMainMenuOpen, null, {
    from: { transform: 'translateY(-130%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(-150%)' },
  });

  const toggleIsMainMenuOpen = () => {
    setIsMainMenuOpen((current) => !current);
  };

  const toggleIsUserMenuOpen = () => {
    setIsUserMenuOpen((current) => !current);
  };

  const closeMainMenu = () => {
    setIsMainMenuOpen(false);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.main}>
          <div className={style.mainContent}>
            <Link {...getFrontPageUrl()}>
              <a onClick={closeMainMenu}>
                <Logo width="150px" />
              </a>
            </Link>
            <nav className={style.mainNavItems}>
              <Link {...getEventsUrl()}>
                <a className={style.navLink} onClick={closeMainMenu}>
                  Arrangementer
                </a>
              </Link>
              <Link {...getFrontPageUrl()}>
                <a className={style.navLink} onClick={closeMainMenu}>
                  Om Online
                </a>
              </Link>
            </nav>
            <span className={style.buttons}>
              <UserButton onClick={toggleIsUserMenuOpen} />
              <Hamburger isOpen={isMainMenuOpen} onClick={toggleIsMainMenuOpen} />
            </span>
          </div>
        </div>
        <div className={style.border} />
        {transition.slice(0, 2).map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props} className={style.navList} aria-hidden={!isMainMenuOpen}>
                <nav className={style.navListContent}>
                  {LINKS.filter((link) => (link.shouldDisplay ? link.shouldDisplay(isLoggedIn, user) : true)).map(
                    (link) =>
                      link.mode === 'internal' ? (
                        <Link key={link.as} href={link.href} as={link.as}>
                          <p>
                            <a className={style.navLink} onClick={closeMainMenu}>
                              {link.title}
                            </a>
                          </p>
                        </Link>
                      ) : (
                        <p key={link.href}>
                          <a className={style.navLink} href={link.href} onClick={closeMainMenu}>
                            {link.title}
                          </a>
                        </p>
                      )
                  )}
                </nav>
              </animated.div>
            )
        )}
        {isUserMenuOpen && <UserMenu onItemClick={closeUserMenu} />}
      </header>
      <div className={style.filler}></div>
    </>
  );
};
