import React from 'react';

import style from './footer.less';

export interface ISocialLink {
  name: string;
  link: string;
  icon: string;
}

const SOCIAL: ISocialLink[] = [
  {
    name: 'facebook',
    link: 'http://facebook.com/LinjeforeningenOnline',
    icon: '/img/social/facebook.svg',
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/online_ntnu/',
    icon: '/img/social/instagram.svg',
  },
  {
    name: 'github',
    link: 'https://www.github.com/dotkom/',
    icon: '/img/social/github.svg',
  },
  {
    name: 'slack',
    link: 'https://onlinentnu.slack.com/',
    icon: '/img/social/slack.svg',
  },
];

const SocialLink = ({ name, link, icon }: ISocialLink) => (
  <a className={style.social} href={link}>
    <img src={icon} alt={name} />
  </a>
);

const SocialLinks = () => (
  <div>
    {SOCIAL.map((platform) => (
      <SocialLink key={platform.name} {...platform} />
    ))}
  </div>
);

export default SocialLinks;
